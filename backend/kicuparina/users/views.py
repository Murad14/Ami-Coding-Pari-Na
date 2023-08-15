from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import RegisterSerializer
'''
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from .forms import LoginForm, UserRegistrationForm
'''

# Create your views here.
'''
def user_login(request):
    # login validation
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = authenticate(
                request, username=data['username'], password=data['password'])
            if user is not None:
                login(request, user)
                return HttpResponse("done")
            else:
                return HttpResponse("Invalid credentials")

    else:
        form = LoginForm()  # get the LoginForm from forms.py
        # pass the form as a context
        return render(request, 'users/login.html', {'form': form})


def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()

            return render(request, 'users/register_done.html')
    else:
        user_form = UserRegistrationForm()
        return render(request, 'users/register.html', {'user_form': user_form})
'''


@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']  # type: ignore
    _, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token
    })


@api_view(['GET'])
def get_user_data(request):
    user = request.user

    if user.is_authenticated:
        return Response({
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            },
        })

    return Response({'error': 'not authenticated'}, status=400)


@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token
    })

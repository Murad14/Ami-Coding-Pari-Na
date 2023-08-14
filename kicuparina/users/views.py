from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from .forms import LoginForm


# Create your views here.

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

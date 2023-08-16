from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import InputValue
from .serializers import InputValueSerializer

class InputValueListCreateView(generics.ListCreateAPIView):
    queryset = InputValue.objects.all()
    serializer_class = InputValueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        input_values = self.request.data.get('input_values')

        # Convert the comma-separated input values to a list of integers
        input_values_list = [int(val) for val in input_values.split(',')]

        # Sort the input values in descending order
        sorted_input_values = sorted(input_values_list, reverse=True)

        # Save the sorted input values along with the user ID and timestamp
        serializer.save(user=user, input_values=sorted_input_values)

class SearchView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        input_values = request.data.get('input_values')  # Comma-separated integers
        search_value = int(request.data.get('search_value'))

        input_values_list = [int(val) for val in input_values.split(',')]
        input_values_list.sort(reverse=True)

        result = search_value in input_values_list

        return Response({'result': result})
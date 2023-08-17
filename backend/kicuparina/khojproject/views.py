from rest_framework.views import APIView
#from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.response import Response
from rest_framework import status
from .models import InputValue
from .serializers import InputDataSerializer
from django.db.models import Q
from datetime import datetime
from dateutil.parser import parse



class KhojSearchView(APIView):
    def post(self, request, format=None):
        input_values = request.data.get('input_values')  # Comma-separated integers
        search_value = request.data.get('search_value')  # Single integer

        # Parse input_values, sort them in descending order, and store in the database
        sorted_input_values = sorted(map(int, input_values.split(',')), reverse=True)
        input_value = InputValue(user=request.user, input_values=sorted_input_values)
        input_value.save()

        # Check if search_value exists in sorted_input_values
        search_result = int(search_value) in sorted_input_values

        return Response({'result': search_result}, status=status.HTTP_200_OK)


class GetAllInputValuesView(APIView):
    def get(self, request, format=None):
        start_datetime_str = request.query_params.get('start_datetime')
        end_datetime_str = request.query_params.get('end_datetime')
        user_id = request.query_params.get('user_id')

        try:
            start_datetime = parse(start_datetime_str)
            end_datetime = parse(end_datetime_str)
        except ValueError:
            return Response({'error': 'Invalid datetime format'}, status=status.HTTP_400_BAD_REQUEST)

        input_values = InputValue.objects.filter(
            Q(user_id=user_id),
            Q(timestamp__gte=start_datetime),
            Q(timestamp__lte=end_datetime)
        )

        serializer = InputDataSerializer(input_values, many=True)
        response_data = {
            'status': 'success',
            'user_id': user_id,
            'payload': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)
from re import template
from django.urls import path
from .import views
from django.contrib.auth import views


urlpatterns = [
   path('login/',views.user_login,name='login'), 
   
]
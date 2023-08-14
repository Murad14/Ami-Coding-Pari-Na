from re import template
from django.urls import path
from .import views
from django.contrib.auth import views as auth_view


urlpatterns = [
    path('login/', views.user_login, name='login'),  # type: ignore
    path('logout/', auth_view.LogoutView.as_view(template_name='users/logout.html'), name='logout'),

    path('register/', views.register, name='register'),  # type: ignore
]

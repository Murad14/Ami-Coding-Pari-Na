from django.urls import path

from .views import InputValueListCreateView, SearchView

urlpatterns = [
    path('input-values/', InputValueListCreateView.as_view(), name='input-values'),
    path('search/', SearchView.as_view(), name='search'),
]


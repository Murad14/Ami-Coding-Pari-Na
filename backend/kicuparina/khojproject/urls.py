from django.urls import path
from .views import KhojSearchView, GetAllInputValuesView

urlpatterns = [
    path('khoj-search/', KhojSearchView.as_view(), name='khoj-search'),
    path('get-all-input-values/', GetAllInputValuesView.as_view(), name='get-all-input-values'),
]

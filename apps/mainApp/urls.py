from django.urls import path
from . import views

urlpatterns = [
    path('api/example/', views.example_view, name='example'),
]
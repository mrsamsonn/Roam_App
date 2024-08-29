from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def example_view(request):
    data = {"message": "Hello from Django API!"}
    return Response(data)

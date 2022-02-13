from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler
from rest_framework.exceptions import NotAuthenticated

def custom_exception_handler(exc, context):
    if isinstance(exc, NotAuthenticated):
        return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    return exception_handler(exc, context)
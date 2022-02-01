from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer
from .models import CustomUser, UserProfile

# Create your views here.

class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        data = request.data
        try:
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                user_data = serializer.data
                user = CustomUser.objects.get(email=user_data['email'])
                UserProfile.objects.create(user=user, username=user.username)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error':f'{e}'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

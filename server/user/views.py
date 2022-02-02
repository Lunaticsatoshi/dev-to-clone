from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer
from .models import CustomUser, UserProfile
from .utils import Utils

# Create your views here.

class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            user = CustomUser.objects.get(email=user_data['email'])
            UserProfile.objects.create(user=user, username=user.username)
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')
            abs_url = f'http://{current_site}{relativeLink}?token={token}'
            email_body = f'Hi {user.username},\n\n Please use this link to verify your email\n: {abs_url}'
            data = {
                'email': user.email,
                'subject': 'Verify your email',
                'body': email_body
            }
            Utils.send_email(data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        pass
        # token = request.GET.get('token')
        # if token is None:
        #     return Response({'error': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     user = CustomUser.objects.get(refresh_token=token)
        # except CustomUser.DoesNotExist:
        #     return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        # user.is_active = True
        # user.save()
        # return Response({'message': 'Email verified'}, status=status.HTTP_200_OK)

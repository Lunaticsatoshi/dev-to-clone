from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
import jwt

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer, LoginSerializerWithToken
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
            return Response(user_data, status=status.HTTP_201_CREATED)
        
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializerWithToken
        
class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        token = request.GET.get('token')
        if token is None:
            return Response({'status': 'error', 'message': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = CustomUser.objects.get(id=payload["user_id"])
            if not user.email_verified:
                user.email_verified = True
                user.save()
                return Response({'status': 'success', 'message': 'Email verified'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'status': 'error', 'message': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'status': 'error', 'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'status': 'error', 'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'status': 'error', 'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
from django.db.models import Q
import jwt

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterSerializer, LoginSerializerWithToken, EmailVerificationSerializer, UserSerializer, AuthUserSerializer, UserProfileSerializer
from .models import CustomUser, Interests
from .utils import Utils

# Create your views here.

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            user = CustomUser.objects.get(email=user_data['email'])
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
            
            return Response({'message': 'User created successfully', 'data': user_data}, status=status.HTTP_201_CREATED)
        
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializerWithToken
    
    def post(self, request):
        data = request.data
        try:
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception=True):
                return Response({'message': 'User logged in sucessfully', 'data': serializer.validated_data}, status=status.HTTP_200_OK)
        
        except CustomUser.DoesNotExist as e:
            return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'message': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)
        
class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = EmailVerificationSerializer
    
    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)
    
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        if token is None:
            return Response({'message': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = CustomUser.objects.get(id=payload["user_id"])
            if not user.email_verified:
                user.email_verified = True
                user.save()
                return Response({'message': 'Email verified'}, status=status.HTTP_200_OK)
            
        except jwt.ExpiredSignatureError as identifier:
            return Response({'message': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        
        except jwt.exceptions.DecodeError as identifier:
            print(identifier)
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
        except CustomUser.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ProfileUpdateView(APIView):
    permission_classes = (AllowAny, IsAuthenticated)
    serializer_class = UserProfileSerializer
    
    def patch(self, request):
        profile = request.user.userprofile
        try:
            serializer = self.serializer_class(profile, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save().user
                new_email = request.data.get('email')
                user = request.user
                if new_email is not None:
                    user.email = new_email
                    profile.emai_verified = False
                    
                    user.save()
                    profile.save()
                return Response({'message': 'Profile updated successfully', 'data': UserSerializer(user).data}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET'])
def get_users(request):
    query = request.query_params.get('q') or ''
    try:
        users = CustomUser.objects.filter(username__icontains=query)
        serializer = UserSerializer(users, many=True)
        
        return Response({'message': 'Users found', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except CustomUser.DoesNotExist as e:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def get_users_by_interest(request, interest):
    try:
        interest = Interests.objects.get(interest=interest)
        users = CustomUser.objects.filter(Q(userprofile__interests__in=[interest])).order_by('-userprofile__follower_count')
        serializer = UserSerializer(users, many=True)
        
        return Response({'message': 'Users found', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except CustomUser.DoesNotExist as e:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user(request, username):
    try:
        user = CustomUser.objects.get(username=username)
        
        if request.user.username == user.username:
            serializer = UserSerializer(user, many=False)
            
            return Response({'message': 'User found', 'data': serializer.data}, status=status.HTTP_200_OK)
        
        serializer = UserSerializer(user, many=True)
        return Response({'message': 'Users found with username', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except CustomUser.DoesNotExist as e:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    try:
        serializer = AuthUserSerializer(user, many=False)
        return Response({'message': 'User found', 'data': serializer.data}, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
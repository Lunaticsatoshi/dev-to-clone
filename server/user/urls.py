from django.urls import path
from .views import RegisterView, VerifyEmailView, LoginView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='user-register'),
    path('auth/login/', LoginView.as_view(), name='user-login'),
    path('email-verify/', VerifyEmailView.as_view(), name='email-verify'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
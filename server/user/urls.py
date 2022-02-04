from django.urls import path
from .views import RegisterView, VerifyEmailView, LoginView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='user-register'),
    path('auth/login/', LoginView.as_view(), name='user-login'),
    path('email-verify/', VerifyEmailView.as_view(), name='email-verify'),
]
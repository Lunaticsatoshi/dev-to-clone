from django.urls import path
from .views import RegisterView, VerifyEmailView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='user-register'),
    path('email-verify/', VerifyEmailView.as_view(), name='email-verify'),
]
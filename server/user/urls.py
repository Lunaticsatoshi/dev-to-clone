from django.urls import path
from .views import RegisterView, VerifyEmailView, LoginView, ProfileUpdateView, get_users, get_users_by_interest, get_user
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='user-register'),
    path('auth/login/', LoginView.as_view(), name='user-login'),
    path('email-verify/', VerifyEmailView.as_view(), name='email-verify'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('all/', get_users, name='get-users'),
    path('<str:username>/', get_user, name='get-user'),
    path('interests/<str:interest>', get_users_by_interest, name='get-users-by-interest'),
    path('profile/update', ProfileUpdateView.as_view(), name='profile-update')
]
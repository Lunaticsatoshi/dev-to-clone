from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='user-register'),
]
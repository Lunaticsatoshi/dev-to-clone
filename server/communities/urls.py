from django.urls import path
from .views import CommunityListApiView, CommunityDetailApiView

url_patterns = [
    path('user/all/', CommunityListApiView.as_view(), name='community-list'),
    path('user/<str:id>/', CommunityDetailApiView.as_view(), name='community-detail'),
]
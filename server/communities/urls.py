from django.urls import path
from .views import CommunityListApiView, CommunityDetailApiView, CommunityCreateApiView

urlpatterns = [
    path('user/all/', CommunityListApiView.as_view(), name='community-list'),
    path('user/<str:id>/', CommunityDetailApiView.as_view(), name='community-detail'),
    path('user/create/', CommunityCreateApiView.as_view(), name='community-create'),
]
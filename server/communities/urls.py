from django.urls import path
from .views import CommunityListApiView, CommunityDetailApiView, CommunityCreateApiView, CommunityUpdateApiView, CommunityDeleteApiView, get_communities, get_community, join_community

urlpatterns = [
    path('user/all/', CommunityListApiView.as_view(), name='community-list'),
    path('user/<str:id>/', CommunityDetailApiView.as_view(), name='community-detail'),
    path('create/', CommunityCreateApiView.as_view(), name='community-create'),
    path('<str:id>/update/', CommunityUpdateApiView.as_view(), name='community-update'),
    path('<str:id>/delete/', CommunityDeleteApiView.as_view(), name='community-delete'),
    path('get/', get_communities, name='get-communities'),
    path('get/<str:slug>/', get_community, name='get-community'),
    path('<str:slug>/join/', join_community, name='join-community'),
]
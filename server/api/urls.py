from django.urls import path, include

urlpatterns = [
    path('user/', include('user.urls')),
    path('articles/', include('articles.urls')),
    path('communities/', include('communities.urls')),
]
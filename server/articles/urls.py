from django.urls import path
from .views import UserArticleListApiView, UserArticleDetailApiView, get_article, get_articles

urlpatterns = [
    path('user/all', UserArticleListApiView.as_view(), name='user-article-list'),
    path('user/<int:id>', UserArticleDetailApiView.as_view(), name='user-article-detail'),
    path('all/', get_articles, name='all-articles'),
    path('<str:slug>/', get_article, name='article-detail'),
]
from django.urls import path
from .views import UserArticleListApiView, UserArticleCreateApiView, UserArticleUpdateApiView, UserArticleDetailApiView, UserArticleDeleteApiView, get_article, get_articles, add_clap, add_comment, edit_comment, delete_comment

urlpatterns = [
    path('user/all', UserArticleListApiView.as_view(), name='user-article-list'),
    path('user/<str:id>', UserArticleDetailApiView.as_view(), name='user-article-detail'),
    path('create/', UserArticleCreateApiView.as_view(), name='user-article-create'),
    path('<str:id>/update/', UserArticleUpdateApiView.as_view(), name='user-article-update'),
    path('<str:id>/delete/', UserArticleDeleteApiView.as_view(), name='user-article-delete'),
    path('all/', get_articles, name='all-articles'),
    path('clap/', add_clap, name='add-clap'),
    path('comment/', add_comment, name='add-comment'),
    path('<str:slug>/', get_article, name='article-detail'),
    path('comment/<str:id>/update/', edit_comment, name='edit-comment'),
    path('comment/<str:id>/delete/', delete_comment, name='delete-comment'),
]
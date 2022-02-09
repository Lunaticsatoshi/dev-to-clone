from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ArticleSerializer
from .models import Article
from .utils import Utils
from .permissions import IsOwner

# Create your views here.
class UserArticleListApiView(ListCreateAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        user = self.request.user
        data = self.request.data
        title = data.get('title')
        
        if not title:
            raise Exception('Title is required')
        
        slug = Utils.generate_slug(title)
        
        return serializer.save(user=user, slug=slug)
    
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
    
class UserArticleDetailApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = 'id'
    
    def get_queryset(self):
        user = self.request.user
        return super().queryset.filter(user=user)
    
    
@api_view(['GET'])
def get_articles(request):
    try:
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response({'messsage': 'Success', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_article(request, slug):
    try:
        article = Article.objects.get(slug=slug)
        serializer = ArticleSerializer(article, many=False)
        return Response({'messsage': 'Success', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
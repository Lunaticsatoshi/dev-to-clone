from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ArticleSerializer
from .models import Article, HashTag
from .utils import Utils
from .permissions import IsOwner

# Create your views here.
class UserArticleListApiView(ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user).order_by('-created_at')
    
class UserArticleCreateAPIView(CreateAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        user = self.request.user
        data = self.request.data
        title = data.get('title')
        content = data.get('content')
        tags = data.get('tags')
        status = data.get('status')
        try:
            if not title or not content:
                raise Exception('Title or Content is required')
            
            slug = Utils.generate_slug(title)
            
            article = Article.objects.create(title=title, content=content, slug=slug, user=user, status=status)
            
            if tags is not None:
                article.tags.set(HashTag.objects.get_or_create(tags=tag_name)[0] for tag_name in tags)
                
            article.save()
            serializer = ArticleSerializer(article, many=False)
            return Response({ 'message': 'Article created successfully', 'article': serializer.data }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({ 'message': str(e) }, status=status.HTTP_400_BAD_REQUEST)
    
class UserArticleDetailApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = 'id'
    
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
    
    
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
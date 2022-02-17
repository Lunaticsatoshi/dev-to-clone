from venv import create
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ArticleSerializer, ArticleCommentSerializer
from .models import Article, HashTag, ArticleClap, ArticleComment
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
    
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_clap(request):
    user = request.user
    data = request.data
    article_id = data.get('article_id')
    comment_id = data.get('comment_id')
    
    try:
        article = Article.objects.get(id=article_id)
        if comment_id:
            comment = ArticleComment.objects.get(id=comment_id)
            clap, created = ArticleClap.objects.get_or_create(user=user, article=article, comment=comment)
            if not created:
                clap.delete()
            else:
                article.clap_count = article.clap_set.all().count()
                clap.save()
        else:
            clap, created = ArticleClap.objects.get_or_create(user=user, article=article)
            if not created:
                clap.delete()
            else:
                article.clap_count = article.clap_set.all().count()
                clap.save()
                
        article.save()
        serializer = ArticleSerializer(article, many=False)
        return Response({'messsage': 'Successfully clapped for article', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_comment(request):
    user = request.user
    data = request.data
    article_id = data.get('article_id')
    comment_id = data.get('comment_id')
    comment = data.get('comment')
    
    try:
        article = Article.objects.get(id=article_id)
        if comment_id:
            parent_comment = ArticleComment.objects.get(id=comment_id)
            comment = ArticleComment.objects.create(user=user, article=article, content=comment, parent=parent_comment)
        else:
            comment = ArticleComment.objects.create(user=user, article=article, content=comment)
            article.comment_count = article.comment_set.all().count()
            article.save()
            
        serializer = ArticleCommentSerializer(comment, many=False)
        return Response({'messsage': 'Successfully commented on article', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
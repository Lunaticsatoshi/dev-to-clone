from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ArticleSerializer, ArticleCommentSerializer
from .models import Article, HashTag, ArticleClap, ArticleComment
from .utils import Utils
from .permissions import IsOwner

# Create your views here.
class UserArticleListApiView(GenericAPIView):
                                
    """
    @desc     Get current user articles via api
    @route    GET /api/v1/articles/user/all/
    @access   Private
    @return   Json
    """
    
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated, IsOwner)
    
    @method_decorator(cache_page(60*60*2))
    def get(self, request):
        user = request.user
        try:
            articles = Article.objects.filter(user=user)
            serializer = ArticleSerializer(articles, many=True)
            return Response({ 'message': 'Articles retrieved sucessfully', 'data': serializer.data }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

class UserArticleCreateApiView(GenericAPIView):
                                    
    """
    @desc     Create current user articles via api
    @route    POST /api/v1/articles/create/
    @access   Private
    @return   Json
    """
    
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    
    def post(self, request):
        user = request.user
        data = request.data
        title = data.get('title')
        content = data.get('content')
        tags = data.get('tags')
        status = data.get('status')
        try:
            if not title or not content:
                return Response({'message': 'title and content is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            slug = Utils.generate_slug(title)
            
            article = Article.objects.create(title=title, content=content, slug=slug, user=user, status=status)
            
            if tags is not None:
                article.tags.set(HashTag.objects.get_or_create(tag=tag_name)[0] for tag_name in tags)
                
            article.save()
            serializer = ArticleSerializer(article, many=False)

            return Response({ 'message': 'Article created successfully', 'article': serializer.data })
        
        except Exception as e:
            print(e)
            return Response({ 'message': 'Something went wrong' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserArticleUpdateApiView(GenericAPIView):
                                    
    """
    @desc     Update current user articles via api
    @route    PUT /api/v1/articles/:id/update/
    @access   Private
    @return   Json
    """
    
    permission_classes = (IsAuthenticated, IsOwner)
    serializer_class = ArticleSerializer

    def put(self, request, id):
        user = request.user
        data = request.data
        try:
            title = data.get('title')
            content = data.get('content')
            tags = data.get('tags')
            status = data.get('status')
            if title:
                slug = Utils.generate_slug(title)
            
            article = Article.objects.get(pk=id)
            if article.user == user:
                article.title = title
                article.slug = slug
                article.content = content
                article.status = status
                if tags is not None:
                    article.tags.set(HashTag.objects.get_or_create(tag=tag_name)[0] for tag_name in tags)
                    
                article.save()
                serializer = ArticleSerializer(article, many=False)
                return Response({ 'message': 'Article updated successfully', 'article': serializer.data })
            
            else:
                return Response({ 'message': 'You are not authorized to update this article' }, status=status.HTTP_403_FORBIDDEN)
        
        except Exception as e:
            print(e)
            return Response({ 'message': 'Something went wrong' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class UserArticleDetailApiView(GenericAPIView):
                                    
    """
    @desc     Get current user article detail via api
    @route    DELETE /api/v1/articles/user/:id/
    @access   Private
    @return   Json
    """
    
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (IsAuthenticated, IsOwner)
    
    @method_decorator(cache_page(60*60*2))
    def get(self, request, id):
        user = request.user
        try:
            article = Article.objects.get(pk=id)
            serializer = ArticleSerializer(article, many=False)
            return Response({'message': 'Article retrieved sucessfully', 'article': serializer.data })
        except Article.DoesNotExist:
            return Response({ 'message': 'Article does not exist' }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({ 'message': 'Something went wrong' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UserArticleDeleteApiView(GenericAPIView):
                                        
    """
    @desc     Delete current user articles via api
    @route    DELETE /api/v1/articles/:id/delete/
    @access   Private
    @return   Json
    """
    
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    def delete(self, request, id):
        user = request.user
        try:
            article = Article.objects.get(pk=id)
            if article.user == user:
                article.delete()
                articles = Article.objects.all()
                serializer = ArticleSerializer(articles, many=True)
                return Response({ 'message': 'Article deleted successfully', 'data': serializer.data }, status=status.HTTP_200_OK)
            
            else:
                return Response({ 'message': 'You are not authorized to delete this article' }, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({ 'message': 'something went wrong' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
@cache_page(60*60*2)
def get_articles(request):
                                        
    """
    @desc     Get articles via api
    @route    GET /api/v1/articles/all/
    @access   Public
    @return   Json
    """
    
    try:
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response({'messsage': 'Success', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@cache_page(60*60*2)
def get_article(request, slug):
                                            
    """
    @desc     Get article by slug via api
    @route    GET /api/v1/articles/:slug/
    @access   Public
    @return   Json
    """
    
    try:
        article = Article.objects.get(slug=slug)
        serializer = ArticleSerializer(article, many=False)
        return Response({'messsage': 'Success', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@cache_page(60*60*2)
def get_comments(request, slug):
                                                
    """
    @desc     Get article comments via api
    @route    GET /api/v1/articles/comments/
    @access   Public
    @return   Json
    """
    
    try:
        article = Article.objects.get(slug=slug)
        comments = ArticleComment.objects.filter(article=article)
        serializer = ArticleCommentSerializer(comments, many=True)
        return Response({'messsage': 'Success', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_clap(request):
                                                
    """
    @desc     Add article clap via api
    @route    POST /api/v1/articles/clap/
    @access   Private
    @return   Json
    """
    
    user = request.user
    data = request.data
    article_id = data.get('article_id')
    comment_id = data.get('comment_id')
    
    try:
        article = Article.objects.get(id=article_id)
        if comment_id:
            comment = ArticleComment.objects.get(id=comment_id)
            clapped_comment = ArticleClap.objects.filter(user=user, comment=comment)
            if clapped_comment:
                clapped_comment.delete()
                article.clap_count = article.articleclap_set.all().count()
            else:
                clap, created = ArticleClap.objects.get_or_create(user=user, article=article, comment=comment)
                if not created:
                    clap.delete()
                else:
                    clap.save()
                    article.clap_count = article.articleclap_set.all().count()
        else:
            clapped_article = ArticleClap.objects.filter(user=user, article=article)
            if clapped_article:
                clapped_article.delete()
                article.clap_count = article.articleclap_set.all().count()
                article.save()
                return Response({'message': 'Article clap removed successfully'}, status=status.HTTP_200_OK)
            else:
                clap, created = ArticleClap.objects.get_or_create(user=user, article=article)
                if not created:
                    clap.delete()
                else:
                    clap.save()
                    article.clap_count = article.articleclap_set.all().count()
                
        article.save()
        serializer = ArticleSerializer(article, many=False)
        return Response({'messsage': 'Successfully clapped for article', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except Article.DoesNotExist:
        return Response({'message': 'Article does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_comment(request):
                                                    
    """
    @desc     Add article comment via api
    @route    POST /api/v1/articles/comment/
    @access   Private
    @return   Json
    """
    
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
            article.comment_count = article.articlecomment_set.all().count()
            article.save()
            
        article_comments = article.articlecomment_set.all()
        serializer = ArticleCommentSerializer(article_comments, many=True)
        return Response({'messsage': 'Successfully commented on article', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    except Article.DoesNotExist:
        return Response({'message': 'Article does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def edit_comment(request, id):
                                                    
    """
    @desc     Update article comment via api
    @route    PUT /api/v1/articles/comment/:id/update/
    @access   Private
    @return   Json
    """
    
    user = request.user
    data = request.data
    comment = data.get('comment')
    
    try:
        article_comment = ArticleComment.objects.get(id=id)
        if article_comment.user == user:
            article = article_comment.article
            article_comment.content = comment
            article_comment.save()
            article_comments = article.articlecomment_set.all()
            serializer = ArticleCommentSerializer(article_comments, many=True)
            return Response({'messsage': 'Successfully edited comment', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You are not authorized to edit this comment'}, status=status.HTTP_400_BAD_REQUEST)
        
    except ArticleComment.DoesNotExist:
        return Response({'message': 'Comment does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def delete_comment(request, id):
                                                        
    """
    @desc     Delete article comment via api
    @route    DELETE /api/v1/articles/comment/:id/delete/
    @access   Private
    @return   Json
    """
    
    user = request.user
    
    try:
        article_comment = ArticleComment.objects.get(id=id)
        if article_comment.user == user:
            article = article_comment.article
            article_comment.delete()
            article_comments = article.articlecomment_set.all()
            serializer = ArticleCommentSerializer(article_comments, many=True)
            return Response({'messsage': 'Successfully Deleted comment', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You are not authorized to delete this comment'}, status=status.HTTP_400_BAD_REQUEST)
        
    except ArticleComment.DoesNotExist:
        return Response({'message': 'Comment does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
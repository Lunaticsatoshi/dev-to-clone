from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from user.serializers import UserProfileSerializer
from .models import Article, ArticleClap, ArticleComment


class ArticleSerializer(ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
        
    def get_user(self, obj):
        user = obj.user.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data
    
class ArticleClapSerializer(ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ArticleClap
        fields = '__all__'
        
    def get_user(self, obj):
        user = obj.user.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data
    
class ArticleCommentSerializer(ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ArticleComment
        fields = '__all__'
        
    def get_user(self, obj):
        user = obj.user.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data
    
        

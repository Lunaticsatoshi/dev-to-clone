from rest_framework.serializers import ModelSerializer

from .models import Article


class PostSerializer(ModelSerializer):

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'content', 'slug', 'clap_count', 'comment_count'
            'created_at', 'updated_at'
        ]

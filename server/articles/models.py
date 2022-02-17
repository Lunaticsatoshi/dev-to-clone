from email.mime import image
import uuid
from django.db import models

from api.models import BaseModel
from user.models import CustomUser

# Create your models here.

class HashTag(BaseModel):
    tag = models.CharField(max_length=500, db_index=True)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.tag}"
class Article(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=700, db_index=True)
    content = models.TextField(max_length=10000)
    article_image=models.CharField(max_length=555, null=True, blank=True)
    slug = models.SlugField(max_length=700, unique=True, db_index=True)
    clap_count = models.IntegerField(null=True, default=0)
    comment_count = models.IntegerField(null=True, default=0)
    tags=models.ManyToManyField(HashTag, related_name='article_tags', blank=True)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.title}"
    
    
class ArticleComment(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(max_length=1000)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.user.username} | {self.content}"
    
class ArticleClap(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.ForeignKey(ArticleComment, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.user.username} | {self.article.title}"
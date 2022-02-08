from django.db import models

from api.models import BaseModel
from user.models import CustomUser
import uuid

# Create your models here.
class Article(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=700)
    content = models.TextField(max_length=10000)
    slug = models.SlugField(max_length=700, unique=True)
    clap_count = models.IntegerField(null=True, default=0)
    comment_count = models.IntegerField(null=True, default=0)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.tite}"
    
class Clap(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return f"{self.user} | {self.article}"
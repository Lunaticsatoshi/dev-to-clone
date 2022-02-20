from django.db import models
import uuid


from api.models import BaseModel
from user.models import CustomUser

# Create your models here.

STATUS_CHOICES = (
        ('Public', 'Public'),
        ('Private', 'Private'),
)
class Communities(BaseModel):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=50, db_index=True, null=False)
    slug = models.SlugField(max_length=700, unique=True, db_index=True)
    description = models.TextField(max_length=1000, null=False)
    profile_image = models.CharField(max_length=755, default='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')
    cover_image = models.CharField(max_length=755, default='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='communities')
    subscribers = models.ManyToManyField(CustomUser, related_name='subscribed_communities')
    subscriber_count = models.IntegerField(default=0)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Public')
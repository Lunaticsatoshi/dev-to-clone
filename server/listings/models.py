from sre_constants import CATEGORY
from unicodedata import category
from django.db import models
import uuid

from api.models import BaseModel
from user.models import CustomUser

# Create your models here.

CATEGORY_CHOICES = (
    ('Collaborators', 'Collaborators'),
    ('Job Listings', 'Job Listings'),
    ('Events', 'Events'),
    ('Contests', 'Contests'),
    ('Courses', 'Courses'),
    ('Hackathons', 'Hackathons'),
    ('Mentorships', 'Mentorships'),
    ('Stuff for Sale', 'Stuff for Sale'),
    ('Products', 'Products'),
)
class Listing(BaseModel):
    """
    Listing model
    """
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=50, db_index=True, null=False)
    slug = models.SlugField(max_length=700, unique=True, db_index=True)
    body = models.TextField(max_length=1000, null=False)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Job Listings')
    location = models.CharField(max_length=100, null=True)
    expiry_date = models.DateTimeField(null=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='listings')
    
    def __str__(self) -> str:
        return f"{self.id} | {self.title}"
    
    
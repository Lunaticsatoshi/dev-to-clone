from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)
import uuid

# Create custom user manager.
class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(username, email, password)
        user.role = 'Admin'
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    
ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('User', 'User'),
    )

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='User')
    email_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self) -> str:
        return f"{self.username} | {self.id}"
    
class Interests(models.Model):
    interest = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.id} | {self.interest}"
    
class UserProfile(models.Model):
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True, db_index=True)
    profile_pic = models.CharField(max_length=755, default='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')
    bio = models.TextField(null=True)
    interests = models.ManyToManyField(Interests, related_name='topic_interests', blank=True)
    follower_count = models.IntegerField(default=0, null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    organization = models.CharField(max_length=500, null=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    website_url = models.CharField(max_length=500, null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    followers = models.ManyToManyField(CustomUser, related_name='followers', blank=True)
    diplay_email = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return str(self.user.username)
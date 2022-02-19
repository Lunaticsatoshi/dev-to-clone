from django.contrib import admin
from .models import CustomUser, UserProfile, Interests
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(UserProfile)

admin.site.register(Interests)
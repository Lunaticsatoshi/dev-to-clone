from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from .models import CustomUser, UserProfile


@receiver(post_save, sender=CustomUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, username=instance.username)
        

@receiver(post_save, sender=CustomUser)
def update_profile(sender, instance, created, **kwargs):
    profile, _ = UserProfile.objects.get_or_create(user=instance)
    
    if created == False:
        profile.username = instance.username
        profile.save()
        
        print("Profile Updated!!")
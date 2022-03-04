from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework import status

from user.serializers import UserProfileSerializer
from .models import Communities
from .utils import Utils

class CommunitiesSerializer(ModelSerializer):
    creator = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Communities
        fields = '__all__'
        
    def get_creator(self, obj):
        user = obj.creator.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data
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
        
    def validate(self, attrs):
        name = attrs.get('name')
        
        if Communities.objects.filter(name=name).exists():
            raise serializers.ValidationError({ 'message': "Community with this name already exists" }, status.HTTP_400_BAD_REQUEST)
        
        if not Utils.validate_name(name):
            raise serializers.ValidationError({ 'message': "Community name can only contain letters, numbers, spaces and '-'" }, status.HTTP_400_BAD_REQUEST)
        
        return attrs
        
    def get_creator(self, obj):
        user = obj.creator.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data
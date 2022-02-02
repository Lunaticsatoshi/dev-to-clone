from rest_framework import serializers
from rest_framework import status

from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):

    default_error_messages = {
        'username': 'The username should only contain alphanumeric characters',
        'email_exists': 'User with this email already exists',
        'username_exists': 'The username is already taken',
    }
    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True, 'max_length': 68, 'min_length': 6, 'error_messages': {'blank': 'password cannot be empty'}},
                        'email': {'validators': []},
                        'username': {'validators': []}}
        fields = ['id', 'email', 'username', 'password', 'is_active', 'is_staff', 'is_superuser']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        if not username.isalnum():
            raise serializers.ValidationError({'username': self.default_error_messages['username']}, code=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': self.default_error_messages['email_exists']}, code=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({'username': self.default_error_messages['username_exists']}, code=status.HTTP_400_BAD_REQUEST)
        return attrs

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
from rest_framework import serializers
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


from .models import CustomUser
from .models import UserProfile

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
    
class LoginSerializerWithToken(TokenObtainPairSerializer):
        
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['id'] = user.id

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'profile', 'username', 'is_superuser', 'is_staff']

    def get_profile(self, obj):
        profile = obj.userprofile
        serializer = UserProfileSerializer(profile, many=False)
        return serializer.data
    
class UserSerializerWithToken(UserSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        exclude = ['password']

    def get_access(self, obj):
        token = RefreshToken.for_user(obj)

        token['username'] = obj.username
        token['profile_pic'] = obj.userprofile.profile_pic
        token['is_staff'] = obj.is_staff
        token['id'] = obj.id
        return str(token.access_token)
    
    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
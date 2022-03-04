from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Listing

class ListingSerializer(ModelSerializer):
    
    class Meta:
        model = Listing
        fields = '__all__'
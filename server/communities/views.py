from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Communities
from .serializers import CommunitiesSerializer

# Create your views here.

class CommunityListApiView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommunitiesSerializer

    def get(self, request):
        user = request.user
        try:
            user_communities = Communities.objects.filter(creator=user)
            serializer = CommunitiesSerializer(user_communities, many=True)
            return Response({ 'message': 'Sucessfully retrieved communities', 'data': serializer.data },status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CommunityDetailApiView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommunitiesSerializer

    def get(self, request, pk):
        try:
            user_community = Communities.objects.get(pk=pk)
            serializer = CommunitiesSerializer(user_community, many=False)
            return Response({ 'message': 'Sucessfully retrieved community', 'data': serializer.data },status=status.HTTP_200_OK)
        
        except Communities.DoesNotExist:
            return Response({'message': 'Community does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
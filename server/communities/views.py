from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Communities
from .serializers import CommunitiesSerializer
from .permissions import IsOwner
from .utils import Utils

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
        
class CommunityCreateApiView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommunitiesSerializer

    def post(self, request):
        user = request.user
        data = request.data
        serializer = self.serializer_class(data=data)
        
        community_name = data.get('name')
        community_description = data.get('description')    
        try:
            if not community_name or not community_description:
                return Response({'message': 'Please provide all the required fields'}, status=status.HTTP_400_BAD_REQUEST)
            
            community_slug = Utils.generate_slug(community_name)
            
            if serializer.is_valid(raise_exception=True):
                community = Communities.objects.create(name=community_name, slug=community_slug, description=community_description, creator=user)
                community.save()
            
                community_serializer = CommunitiesSerializer(community, many=False)
                return Response({ 'message': 'Sucessfully created community', 'data': community_serializer.data },status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CommunityUpdateApiView(GenericAPIView):
    permission_classes = (IsAuthenticated, IsOwner,)
    serializer_class = CommunitiesSerializer
    
    def put(self, request, id):
        user = request.user
        data = request.data
        serializer = self.serializer_class(data=data)
        
        community_name = data.get('name')
        community_description = data.get('description')
        
        try:
            if community_name :
                community_slug = Utils.generate_slug(community_name)
                
            if serializer.is_valid(raise_exception=True):            
                community = Communities.objects.get(pk=id)
                community.name = community_name
                community.slug = community_slug
                community.description = community_description
                community.save()
                
                serializer = CommunitiesSerializer(community, many=False)
                return Response({ 'message': 'Sucessfully updated community', 'data': serializer.data },status=status.HTTP_200_OK)
        
        except Communities.DoesNotExist:
            return Response({'message': 'Community does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class CommunityDeleteApiView(GenericAPIView):    
    permission_classes = (IsAuthenticated, IsOwner,)
    serializer_class = CommunitiesSerializer  
     
    def delete(self, request, id):
        user = request.user
        try:
            community = Communities.objects.get(pk=id)
            
            if user == community.creator:
                community.delete()
                communities = Communities.objects.filter(creator=user)
                serializer = CommunitiesSerializer(communities, many=True)
                return Response({ 'message': 'Sucessfully deleted community', 'data': serializer.data },status=status.HTTP_200_OK)
            
        
        except Communities.DoesNotExist:
            return Response({'message': 'Community does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def get_communities(request):
    try:
        communities = Communities.objects.all()
        serializer = CommunitiesSerializer(communities, many=True)
        return Response({ 'message': 'Sucessfully retrieved communities', 'data': serializer.data },status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def get_community(request, slug):
    try:
        community = Communities.objects.get(slug=slug)
        serializer = CommunitiesSerializer(community, many=False)
        return Response({ 'message': 'Sucessfully retrieved community', 'data': serializer.data },status=status.HTTP_200_OK)
    except Communities.DoesNotExist:
        return Response({'message': 'Community does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
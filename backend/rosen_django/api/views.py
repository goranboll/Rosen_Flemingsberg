from rosen_django.api.models import Homie, Map, Tile, Gang
from rosen_django.api.serializers import HomiesListSerializer, GangSerializer, TileSerializer, MapSerializer,HomieDetailsSerializer
from rest_framework import generics
from rest_framework.views import APIView
from django.contrib.auth.models import UserManager, User
from django.contrib.auth import get_user_model
from rest_framework.response import Response

class HomiesListAPIView(generics.ListAPIView):
    serializer_class = HomiesListSerializer
    queryset = Homie.objects.all()
    
class HomieAPIView(generics.RetrieveAPIView):
    serializer_class = HomieDetailsSerializer
    queryset = Homie.objects.all()

class RegisterAPIView(generics.CreateAPIView):
    queryset = Gang.objects.all()
    serializer_class = GangSerializer
    def post(self, request):
        get_user_model().objects.create_user(request.DATA.get('username'), email=request.DATA.get('email'))
        return Response("kiss")
    def get(self, request):
        return Response("bajs")


class GenerateMapAPIView(APIView):
    def get(self, request):
        map = Map.objects.create()
        mappy = map.generate_map()
        return Response(mappy)
    
class GetMapAPIView(generics.ListAPIView):
    serializer_class = TileSerializer
    def list(self, request, mapid):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset(mapid)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def get_queryset(self, mapid):

        return Tile.objects.filter(mapid = str(mapid))
    
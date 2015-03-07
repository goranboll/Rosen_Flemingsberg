from rosen_django.api.models import Homie, Map, Tile
from rosen_django.api.serializers import HomiesListSerializer, UserSerializer, TileSerializer
from rest_framework import generics
from rest_framework.views import APIView
from django.contrib.auth.models import UserManager, User
from django.contrib.auth import get_user_model
from rest_framework.response import Response

class HomiesListAPIView(generics.ListAPIView):
    serializer_class = HomiesListSerializer
    queryset = Homie.objects.all()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
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
    queryset = Tile.objects.all()
    lookup_field = "idmap"
    serializer_class = TileSerializer
    
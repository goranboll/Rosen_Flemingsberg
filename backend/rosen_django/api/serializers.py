from rosen_django.api.models import Homie, Tile
from rest_framework import serializers
from django.contrib.auth.models import UserManager, User

class HomiesListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Homie
        fields = ('first_name', 'last_name')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('username', 'email')
        

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = ('type', 'x', 'y','mapvariant','id')
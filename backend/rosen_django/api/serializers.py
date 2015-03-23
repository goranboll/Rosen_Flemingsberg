from rosen_django.api.models import Homie, Tile, Gang, TileType, Map, Item
from rest_framework import serializers
from django.contrib.auth.models import UserManager,User



class HomiesListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Homie
        fields = ('first_name', 'last_name')

class GangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gang 
        fields = ('username', 'email')
        
class GangColorSerializer(serializers.ModelSerializer):
    color = serializers.StringRelatedField()
    class Meta:
        model = Gang 
        fields = ('color',)
 
class HomieDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homie
        fields = ('name','energy')
        
class TileTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TileType
        fields = ('name',)
class ItemSerializer(serializers.ModelSerializer):
     gang = GangColorSerializer()
     #color = serializers.SerializerMethodField('get_color')
     #def get_color(self,item):
      #  return item.gang.Color
     
     class Meta:
        model = Item
        fields=('id', 'name' , 'energy','picture','gang','itemtype')


class TileSerializer(serializers.ModelSerializer):
    # tiletype = serializers.SerializerMethodField('get_tile_type')
    # def get_tile_type(self, obj):
    #     return obj.get_type_name()
    items = ItemSerializer(many=True)

    tiletype = TileTypeSerializer()    
    class Meta:
        model = Tile
        fields = ('tiletype', 'x', 'y','mapvariant','id', 'items')

class MapSerializer(serializers.ModelSerializer):
    tiles = TileSerializer(many=True)
    class Meta:
        model = Map
        fields = ('id', 'tiles')

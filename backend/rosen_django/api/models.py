from django.db import models 
from django.contrib.auth.models import AbstractUser
from django.contrib import admin

import random

    

# hej
class Color(models.Model):
    name = models.CharField(max_length=10)
    def __unicode__(self):
        return self.name

# class ItemType(models.Model):
#     name = models.CharField(max_length=30)
#     def __unicode__(self):
#         return name
class SpecialLocation(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    tiletype= models.ForeignKey('TileType', default=1)
    def __unicode__(self):
        return str(self.tiletype)


class TileType(models.Model):
    name = models.CharField(max_length=30)
    id = models.IntegerField(primary_key=True)
    def __unicode__(self):
        return self.name

class Gang(AbstractUser):
    name = models.CharField(max_length=30)
    color = models.ForeignKey(Color, default=1, null=True)
    mapid = models.ForeignKey('Map', null=True, related_name='gang')
    def __unicode__(self):
        return self.name
    

class Tile(models.Model):
    tiletype = models.ForeignKey(TileType, default=1)
    mapid = models.ForeignKey('Map', null=True, related_name='tiles')
   # mapid = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    picture = models.CharField(max_length=100)
    gang = models.ForeignKey(Gang, null=True)
    mapvariant = models.IntegerField()
    def __unicode__(self):
        return '{0} - {1}'.format(str(self.tiletype), self.id)

class Item(models.Model):
    tile = models.ForeignKey(Tile, related_name='items')
    name = models.CharField(max_length=50)
    picture = models.CharField(max_length=100)
    energy = models.IntegerField(default = 100)
    #itemtype = models.ForeignKey(ItemType, null=True)
    gang = models.ForeignKey(Gang)
    #mapvariant = models.IntegerField()
    itemtype = models.CharField(max_length=20)
    # class Meta:
    #     abstract = True
    def __unicode__(self):
        return self.name

class Homie(Item, models.Model):
    strenght = models.IntegerField()
    endurance = models.IntegerField()
    # def __init__(self):
    #     self.itemtype = 'Homie'
    def __unicode__(self):
        return self.name
class Vehicle(Item, models.Model):
    passengers = models.ForeignKey(Homie)
    # def __init__(self):
    #     self.itemtype = 'Vehicle'
    




#class Car(Item):
#    passengers = models.ForeignKey(Homie)

   
MAP_WIDTH = 14
MAP_HEIGHT = 14

class Map(models.Model):

    def generate_map(self):
        
        tileslist = []
        for i in range(0,196):
            tile = Tile.objects.create(
            y = i/MAP_WIDTH +1,
            x = i%MAP_WIDTH +1,
            mapvariant = random.randint(1, 6),
            gang = Gang.objects.first(),
            mapid = self

            )

            if SpecialLocation.objects.filter(x=tile.x, y=tile.y).exists():
                sl = SpecialLocation.objects.get(x=tile.x, y=tile.y)
                tile.tiletype  = sl.tiletype
                tile.save()
            tileslist.append(tile)

        return tileslist
        
        

admin.site.register(TileType)
admin.site.register(Gang)
admin.site.register(Color)
#admin.site.register(ItemType)
admin.site.register(Homie)
admin.site.register(Vehicle)
admin.site.register(Map)
admin.site.register(Tile)
admin.site.register(SpecialLocation)

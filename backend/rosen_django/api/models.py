from django.db import models 
from django.contrib.auth.models import AbstractUser

class Homie(Item):
    pass
   

  
TILE_TYPES = (
    (1, 'Generic'),
    (2, 'Carstore'),
    (3, 'Unemploymentoffice'),
    (4, 'Courthouse'),
    (5, 'Policestation'),
    (6, 'Bikeandmopedstore'),
    (7, 'Hospital'),
    (8, 'Cityhall'),
    (9, 'Mainstreet'),
    (10, 'Trainstation'),
    (11, 'HQ'),
    (12, 'Gasstation'),


    )
ITEM_TYPES = (
    (1, 'Homie'),
    (2, 'Car'),
    (3, 'Moped'),
    (4, 'Bike'),
    )

GANG_COLORS = (
    (1, 'DB42C7'),
    (2, 'B35DED'),
    (3, '1EFA3F'),
    (4, 'FABF1E'),
    (5, 'EB7465'),
    (6, '6BB7DD'),
    (7, '1AFCF0'),
    (8, 'E8F908'),

    )
class Gang(models.Model):
    name = models.CharField(max_length=30)
    color = models.IntegerField(max_length=10)


class Tile(models.Model):
    type = models.IntegerField(choices=TILE_TYPES, default=1)
    x = models.IntegerField()
    y = models.IntegerField()
    picture = models.CharField(max_length=100)
    gang = model.ForeignKey(Gang)
    mapvariant = models.IntegerField

class Item(models.Model):
    tile = models.ForeignKey(Tile)
    name = models.CharField(max_length=50)
    picture = models.CharField(max_length=100)
    gang = models.ForeignKey(Gang)
    energy = models.IntegerField()
    type = models.IntegerField(choices=ITEM_TYPES, default=1)

class Car(Item):
    passengers = model.ForeignKey(Homie)


class Map(models.Model):
    pass
    #def generate_map(self):
    #    for x in range(0,196):
    #        tile = Tile.objects.

from django.db import models 

class Homie(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=50)
    type = models.CharField(max_length=10)

    FIST_NAMES = (
        (1 , 'Thomas'),
        (2, 'Martin'),
        (3, 'Roger'),
        (4, 'Anders'),
        (5, 'Klas')
        )
    LAST_NAMES = (
        (1 , 'Ravelli'),
        (2, 'Dahlin'),
        (3, 'Ljung'),
        (4, 'Limpbar'),
        (5, 'Ingesson')


        )


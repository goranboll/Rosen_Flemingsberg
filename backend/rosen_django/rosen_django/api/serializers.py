from rosen_django.api.models import Homie
from rest_framework import serializers

class HomiesListSerializer(serializers.ModelSerializer):

    class meta:
        model = Homie
        fields = ('first_name', 'last_name')
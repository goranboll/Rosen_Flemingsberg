from rosen_django.api.models import Homie
from rosen_django.api.serializers import HomiesListSerializer
from rest_framework import generics

class HomiesListAPIView(generics.ListAPIView):
    serializer_class = HomiesListSerializer
    queryset = Homie.objects.all()

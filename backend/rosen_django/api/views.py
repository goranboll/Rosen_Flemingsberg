from rosen_django.api.models import Homie
from rosen_django.api.serializers import HomiesListSerializer, UserSerializer
from rest_framework import generics
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
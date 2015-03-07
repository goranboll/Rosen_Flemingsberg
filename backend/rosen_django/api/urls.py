from django.conf.urls import patterns, url   
from rosen_django.api.views import HomiesListAPIView, RegisterAPIView, GenerateMapAPIView


urlpatterns = patterns('',
    url(r'^homies/$', HomiesListAPIView.as_view()),
    url(r'^register/$' , RegisterAPIView.as_view()),
    url(r'^generatemap/$' , GenerateMapAPIView.as_view())
)
from django.conf.urls import patterns, url   
from rosen_django.api.views import HomiesListAPIView, RegisterAPIView, GenerateMapAPIView, GetMapAPIView


urlpatterns = patterns('',
    url(r'^homies/$', HomiesListAPIView.as_view()),
    url(r'^register/$' , RegisterAPIView.as_view()),
    url(r'^generatemap/$' , GenerateMapAPIView.as_view()),
    url(r'^getmap/(?P<mapid>\d+)/$' , GetMapAPIView.as_view())
)
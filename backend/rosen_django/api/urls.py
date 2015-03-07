from django.conf.urls import patterns, url   
from rosen_django.api.views import HomiesListAPIView, RegisterAPIView


urlpatterns = patterns('',
    url(r'^homies/$', HomiesListAPIView.as_view()),
    url(r'^register/$' , RegisterAPIView.as_view())
)
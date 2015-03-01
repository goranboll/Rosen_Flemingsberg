from django.conf.urls import patterns, url   
from rosen_django.api.views import HomiesListAPIView
urlpatterns = patterns('',
    url(r'^homies/$', HomiesListAPIView.as_view()),
)
from django.conf.urls import patterns, url

from auth import views

urlpatterns = patterns('',
    url(r'^$', views.login, name='login'),
)
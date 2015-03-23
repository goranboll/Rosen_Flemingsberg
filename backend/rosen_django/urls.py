from django.conf.urls import url, include
from django.contrib.auth.models import User
from api.models import Gang
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
admin.autodiscover()

# Serializers define the API representation.
class GangSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gang
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class GangViewSet(viewsets.ModelViewSet):
    queryset = Gang.objects.all()
    serializer_class = GangSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', GangViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/' , include('rosen_django.api.urls')),
    url(r'^admin/', include(admin.site.urls)),
]
from django.urls import path
from . import views
from rest_framework import routers
from .api import AnimeViewSet


router = routers.DefaultRouter()
router.register('api/anime', AnimeViewSet, 'anime')


urlpatterns = router.urls

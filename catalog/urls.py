from django.urls import path
from . import views
from rest_framework import routers
from .api import AnimeViewSet
from .api import GenreViewSet
from .api import CommentViewSet


# router = routers.DefaultRouter()
# router.register('api/anime', AnimeViewSet, 'anime')
# router.register('api/genre', GenreViewSet, 'genre')
# router.register('api/comment', CommentViewSet, 'comment')
#
#
# urlpatterns = router.urls

urlpatterns = [
    path('', views.index, name='index'),
]

import django.conf.urls.i18n
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
    path('animes/', views.AnimeListView.as_view(), name='animes'),
    path('animes/<int:pk>/', views.AnimeDetailView.as_view(), name='anime_detail'),
    #path('users/', views.UserListView.as_view(), name='users'),
    #path('users/<int:pk>/', views.UserDetailView.as_view(), name='user_detail'),
]

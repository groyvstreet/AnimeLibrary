from django.urls import path
from django.urls import include
from rest_framework import routers
from catalog.api.anime_view_set import AnimeViewSet
from catalog.api.comment_view import CommentView
from catalog.api.genre_view_set import GenreViewSet
from catalog.api.rating_view import RatingView
from catalog.api.status_view_set import StatusViewSet
from catalog.api.user_animes_view import UserAnimesView
from catalog.views import activate


router = routers.DefaultRouter()
router.register(r'animes', AnimeViewSet, 'animes')
router.register(r'genres', GenreViewSet, 'genres')
router.register(r'statuses', StatusViewSet, 'statuses')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken')),
    path('api/comments/', CommentView.as_view()),
    path('api/users/<int:pk>/animes/', UserAnimesView.as_view()),
    path('api/ratings/', RatingView.as_view()),
    path('activation/<uid>/<token>/', activate),
]

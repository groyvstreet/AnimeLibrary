from rest_framework import viewsets, permissions
from .models import Anime
from .models import Genre
from .models import Comment
from .serializers import AnimeSerializer
from .serializers import GenreSerializer
from .serializers import CommentSerializer


class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = AnimeSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = GenreSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = CommentSerializer

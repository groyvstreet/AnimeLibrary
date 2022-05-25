from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .models import Anime
from .models import Genre
from .models import Comment
from .serializers import AnimeSerializer, UserSerializer
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

    def get_permissions(self):
        """Instantiates and returns the list of permissions that this view requires."""
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

from .models import Anime
from rest_framework import viewsets, permissions
from .serializers import AnimeSerializer


class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = AnimeSerializer

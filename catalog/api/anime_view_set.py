from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions
from catalog.api.permissions.readonly import ReadOnly
from catalog.models.anime import Anime
from catalog.serializers.anime_serializer import AnimeSerializer
from catalog.service import AnimeFilter


class AnimeViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AnimeFilter
    queryset = Anime.objects.all().distinct()
    serializer_class = AnimeSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

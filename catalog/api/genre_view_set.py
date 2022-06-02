from rest_framework import viewsets, permissions
from catalog.api.permissions.readonly import ReadOnly
from catalog.models.genre import Genre
from catalog.serializers.genre_serializer import GenreSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

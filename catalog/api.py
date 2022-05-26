from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, views, generics
from .models import Anime, Rating
from .models import Genre
from .models import Comment
from .serializers import AnimeSerializer, UserSerializer, RatingSerializer
from .serializers import GenreSerializer
from .serializers import CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .service import AnimeFilter, RatingFilter
from rest_framework.response import Response


class AnimeViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AnimeFilter
    queryset = Anime.objects.all().distinct()
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


class UserAnimesView(views.APIView):

    def get(self, request, pk):
        animes = Anime.objects.filter(user__id=pk)
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        animes = Anime.objects.filter(user__id=pk)
        anime = animes.filter(id=request.data['anime'])[0]
        anime.user.remove(pk)
        serializer = AnimeSerializer(Anime.objects.filter(user__id=pk), many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        anime = Anime.objects.filter(id=request.data['anime'])[0]
        anime.user.add(pk)
        serializer = AnimeSerializer(Anime.objects.filter(user__id=pk), many=True)
        return Response(serializer.data)


class RatingView(generics.ListAPIView):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RatingFilter
    queryset = Rating.objects.all().distinct()
    serializer_class = RatingSerializer

    def post(self, request):
        anime = Anime.objects.get(id=request.data['anime'])
        user = User.objects.get(id=request.data['user'])
        Rating.objects.update_or_create(
            anime=anime, user=user,
            defaults={'number': request.data['value']}
        )
        ratings = Rating.objects.filter(anime=anime)
        average = 0
        for rating in ratings:
            average += rating.number
        average /= len(ratings)
        anime.average_rating = round(average, 2)
        anime.save()
        serializer = RatingSerializer(Rating.objects.all(), many=True)
        return Response(serializer.data)

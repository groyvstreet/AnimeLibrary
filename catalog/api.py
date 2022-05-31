from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, views, generics
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import Anime, Rating, Status
from .models import Genre
from .models import Comment
from .serializers import AnimeSerializer, RatingSerializer, StatusSerializer, UserAnimesSerializer
from .serializers import GenreSerializer
from .serializers import CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .service import AnimeFilter, RatingFilter
from rest_framework.response import Response


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class AnimeViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AnimeFilter
    queryset = Anime.objects.all().distinct()
    serializer_class = AnimeSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserAnimesView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        animes = Anime.objects.filter(user__id=pk)
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            animes = Anime.objects.filter(user__id=pk)
            anime = animes.filter(id=request.data['anime'])[0]
            anime.user.remove(pk)
            serializer = AnimeSerializer(Anime.objects.filter(user__id=pk), many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def post(self, request, pk):
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            anime = Anime.objects.filter(id=request.data['anime'])[0]
            anime.user.add(pk)
            serializer = AnimeSerializer(Anime.objects.filter(user__id=pk), many=True)
            return Response(serializer.data)
        return Response(serializer.errors)


class RatingView(generics.ListAPIView):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RatingFilter
    queryset = Rating.objects.all().distinct()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            anime = Anime.objects.get(id=request.data['anime'])
            user = User.objects.get(id=request.data['user'])
            Rating.objects.update_or_create(
                anime=anime, user=user,
                defaults={'number': request.data['number']}
            )
            ratings = Rating.objects.filter(anime=anime)
            average = 0
            for rating in ratings:
                average += rating.number
            average /= len(ratings)
            anime.average_rating = round(average, 2)
            anime.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

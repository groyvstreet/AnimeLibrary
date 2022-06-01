from asgiref.sync import sync_to_async
from rest_framework import viewsets, permissions, views, generics
from rest_framework.permissions import BasePermission, SAFE_METHODS

from .dao.anime_dao import AnimeDao
from .dao.comment_dao import CommentDao
from .dao.rating_dao import RatingDao
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


class CommentView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            CommentDao.create(request.data['user'], request.data['anime'], request.data['text'])
            return Response(serializer.data)
        return Response(serializer.errors)


class UserAnimesView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        animes = AnimeDao.get_user_animes(pk)
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            AnimeDao.delete_user_anime(pk, request.data['anime'])
            animes = AnimeDao.get_user_animes(pk)
            serializer = AnimeSerializer(animes, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def post(self, request, pk):
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            AnimeDao.add_user_anime(pk, request.data['anime'])
            animes = AnimeDao.get_user_animes(pk)
            serializer = AnimeSerializer(animes, many=True)
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
            RatingDao.set_user_rating(request.data['user'], request.data['anime'], request.data['number'])
            return Response(serializer.data)
        return Response(serializer.errors)


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

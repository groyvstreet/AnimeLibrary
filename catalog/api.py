from rest_framework import viewsets, permissions, views, generics
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .dao.anime_dao import AnimeDao
from .dao.comment_dao import CommentDao
from .dao.rating_dao import RatingDao
from .dao.user_dao import UserDao
from .models import Anime, Rating, Status
from .models import Genre
from .models import Comment
from .serializers import AnimeSerializer, RatingSerializer, StatusSerializer, UserAnimesSerializer
from .serializers import GenreSerializer
from .serializers import CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .service import AnimeFilter, RatingFilter
from rest_framework.response import Response
import logging


logger = logging.getLogger(__name__)


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
            anime = AnimeDao.get_by_id(request.data['anime'])
            user = UserDao.get_by_id(request.data['user'])
            logger.info(f'COMMENT TO ANIME "{anime.title}" CREATED BY USER "{user.username}"')
            return Response(serializer.data)
        logger.warning('FAILED ATTEMPT TO CREATE COMMENT, BAD DATA')
        return Response(serializer.errors)


class UserAnimesView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        animes = AnimeDao.get_user_animes(pk)
        serializer = AnimeSerializer(animes, many=True)
        user = UserDao.get_by_id(pk)
        logger.info(f'USER "{user.username}" ANIMES GETTED')
        return Response(serializer.data)

    def delete(self, request, pk):
        user = UserDao.get_by_id(pk)
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            AnimeDao.delete_user_anime(pk, request.data['anime'])
            animes = AnimeDao.get_user_animes(pk)
            serializer = AnimeSerializer(animes, many=True)
            anime = AnimeDao.get_by_id(request.data['anime'])
            logger.info(f'ANIME "{anime.title}" DELETED FROM USER "{user.username}" ANIMES')
            return Response(serializer.data)
        logger.warning(f'FAILED ATTEMPT TO DELETE ANIME FROM USER "{user.username}" ANIMES, BAD DATA')
        return Response(serializer.errors)

    def post(self, request, pk):
        user = UserDao.get_by_id(pk)
        serializer = UserAnimesSerializer(data=request.data)
        if serializer.is_valid():
            AnimeDao.add_user_anime(pk, request.data['anime'])
            animes = AnimeDao.get_user_animes(pk)
            serializer = AnimeSerializer(animes, many=True)
            anime = AnimeDao.get_by_id(request.data['anime'])
            logger.info(f'ANIME "{anime.title}" ADDED TO USER "{user.username}" ANIMES')
            return Response(serializer.data)
        logger.warning(f'FAILED ATTEMPT TO ADD ANIME TO USER "{user.username}" ANIMES, BAD DATA')
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
            anime = AnimeDao.get_by_id(request.data['anime'])
            user = UserDao.get_by_id(request.data['user'])
            logger.info(f'RATING {request.data["number"]} TO ANIME "{anime.title}" SETTED BY USER "{user.username}"')
            return Response(serializer.data)
        logger.warning(f'FAILED ATTEMPT TO SET RATING TO ANIME BY USER, BAD DATA')
        return Response(serializer.errors)


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

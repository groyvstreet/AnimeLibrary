from rest_framework import permissions, views
from rest_framework.response import Response
from catalog.dao.anime_dao import AnimeDao
from catalog.dao.user_dao import UserDao
from catalog.serializers.anime_serializer import AnimeSerializer
from catalog.serializers.user_animes_serializer import UserAnimesSerializer
import logging

logger = logging.getLogger(__name__)


class UserAnimesView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk) -> Response:
        """Get-request, that returns response with json animes list of specific user"""
        animes = AnimeDao.get_user_animes(pk)
        serializer = AnimeSerializer(animes, many=True)
        user = UserDao.get_by_id(pk)
        logger.info(f'USER "{user.username}" ANIMES GETTED')
        return Response(serializer.data)

    def delete(self, request, pk) -> Response:
        """Delete-request for deleting anime from animes list of specific user"""
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

    def post(self, request, pk) -> Response:
        """Post-request for adding anime to animes list of specific user"""
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

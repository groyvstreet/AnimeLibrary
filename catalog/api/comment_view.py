from rest_framework import generics, permissions
from catalog.dao.anime_dao import AnimeDao
from catalog.dao.comment_dao import CommentDao
from catalog.dao.user_dao import UserDao
from catalog.models.comment import Comment
from catalog.serializers.comment_serializer import CommentSerializer
from rest_framework.response import Response
import logging


logger = logging.getLogger(__name__)


class CommentView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request) -> Response:
        """Post-request for creating comment by user"""
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            CommentDao.create(request.data['user'], request.data['anime'], request.data['text'])
            anime = AnimeDao.get_by_id(request.data['anime'])
            user = UserDao.get_by_id(request.data['user'])
            logger.info(f'COMMENT TO ANIME "{anime.title}" CREATED BY USER "{user.username}"')
            return Response(serializer.data)
        logger.warning('FAILED ATTEMPT TO CREATE COMMENT, BAD DATA')
        return Response(serializer.errors)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from catalog.dao.anime_dao import AnimeDao
from catalog.dao.rating_dao import RatingDao
from catalog.dao.user_dao import UserDao
from catalog.models.rating import Rating
from catalog.serializers.rating_serializer import RatingSerializer
from catalog.service import RatingFilter
from rest_framework.response import Response
import logging


logger = logging.getLogger(__name__)


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

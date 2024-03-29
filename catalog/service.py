from django_filters import rest_framework
from catalog.models.anime import Anime
from catalog.models.rating import Rating


class CharFilterInFilter(rest_framework.BaseInFilter, rest_framework.CharFilter):
    pass


class AnimeFilter(rest_framework.FilterSet):
    genre = CharFilterInFilter(field_name='genre__name', lookup_expr='in')
    status = CharFilterInFilter(field_name='status__name', lookup_expr='in')
    user = CharFilterInFilter(field_name='user__username', lookup_expr='in')

    class Meta:
        model = Anime
        fields = ['genre', 'status', 'user']


class RatingFilter(rest_framework.FilterSet):
    anime = rest_framework.NumberFilter(field_name='anime__id')
    user = rest_framework.NumberFilter(field_name='user__id')

    class Meta:
        model = Rating
        fields = ['anime', 'user']

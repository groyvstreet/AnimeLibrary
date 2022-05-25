from django_filters import rest_framework
from catalog.models import Anime


class CharFilterInFilter(rest_framework.BaseInFilter, rest_framework.CharFilter):
    pass


class AnimeFilter(rest_framework.FilterSet):
    genre = CharFilterInFilter(field_name='genre__name', lookup_expr='in')
    status = rest_framework.CharFilter(lookup_expr='in')

    class Meta:
        model = Anime
        fields = ['genre', 'status']

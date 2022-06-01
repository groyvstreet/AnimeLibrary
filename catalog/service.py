from django.contrib.auth.models import User
from django.core.mail import send_mail
from django_filters import rest_framework

import animelibrary.settings
from catalog.models import Anime, Rating, Comment


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


def send(username, anime_id, anime_title):
    comments = Comment.objects.filter(anime=anime_id)
    emails = set()
    for comment in comments:
        user = User.objects.get(id=comment.user_id)
        emails.add(user.email)
    send_mail(
        'Новый комментарий',
        f'Пользователь "{username}" оставил отзыв к аниме "{anime_title}".',
        animelibrary.settings.EMAIL_HOST_USER,
        emails,
        fail_silently=False)

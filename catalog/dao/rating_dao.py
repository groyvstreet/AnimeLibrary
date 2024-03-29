from django.contrib.auth.models import User
from catalog.models.anime import Anime
from catalog.models.rating import Rating


class RatingDao:
    @staticmethod
    def set_user_rating(user_id, anime_id, value):
        anime = Anime.objects.get(id=anime_id)
        user = User.objects.get(id=user_id)
        Rating.objects.update_or_create(
            anime=anime, user=user,
            defaults={'number': value}
        )
        anime = Anime.objects.get(id=anime_id)
        ratings = Rating.objects.filter(anime=anime_id)
        average = 0
        for rating in ratings:
            average += rating.number
        average /= len(ratings)
        anime.average_rating = round(average, 2)
        anime.save()

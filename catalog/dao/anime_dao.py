from catalog.models import Anime


class AnimeDao:
    @staticmethod
    def get_user_animes(user_id):
        return Anime.objects.filter(user__id=user_id)

    @staticmethod
    def delete_user_anime(user_id, anime_id):
        anime = Anime.objects.get(id=anime_id)
        anime.user.remove(user_id)

    @staticmethod
    def add_user_anime(user_id, anime_id):
        anime = Anime.objects.get(id=anime_id)
        anime.user.add(user_id)

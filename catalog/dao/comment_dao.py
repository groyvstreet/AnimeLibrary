from django.contrib.auth.models import User
from catalog.models.comment import Comment
from catalog.models.anime import Anime
from catalog.tasks import send


class CommentDao:
    @staticmethod
    def create(user_id, anime_id, text):
        anime = Anime.objects.get(id=anime_id)
        user = User.objects.get(id=user_id)
        Comment.objects.create(anime=anime, user=user, text=text)
        send.delay(user.username, anime_id, anime.title)

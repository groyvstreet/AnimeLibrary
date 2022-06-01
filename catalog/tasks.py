from django.contrib.auth.models import User
from django.core.mail import send_mail
from animelibrary.settings import EMAIL_HOST_USER
from animelibrary.celery import app
from catalog.models import Comment


@app.task
def send(username, anime_id, anime_title):
    comments = Comment.objects.filter(anime=anime_id)
    emails = set()
    for comment in comments:
        user = User.objects.get(id=comment.user_id)
        emails.add(user.email)
    send_mail(
        'Новый комментарий',
        f'Пользователь "{username}" оставил отзыв к аниме "{anime_title}".',
        EMAIL_HOST_USER,
        emails,
        fail_silently=False)

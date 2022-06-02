from django.contrib.auth.models import User
from django.core.mail import send_mail
from animelibrary.settings import EMAIL_HOST_USER
from animelibrary.celery import app
from catalog.models.comment import Comment


@app.task
def send(username, anime_id, anime_title):
    sender = User.objects.get(username=username)
    comments = Comment.objects.filter(anime=anime_id)
    emails = set()
    for comment in comments:
        if not sender.id == comment.user_id:
            user = User.objects.get(id=comment.user_id)
            emails.add(user.email)
    send_mail(
        'Новый комментарий',
        f'Пользователь "{username}" оставил отзыв к аниме "{anime_title}".',
        EMAIL_HOST_USER,
        emails,
        fail_silently=False)

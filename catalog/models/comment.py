from django.db import models
from django.contrib.auth.models import User
from catalog.models.anime import Anime


class Comment(models.Model):
    date = models.DateTimeField('Время', auto_now_add=True, null=True)
    text = models.TextField('Текст', max_length=100000, help_text='Введите комментарий')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['-date']
        indexes = [
            models.Index(fields=['anime'])
        ]

    def __str__(self):
        return self.text

    def display_text(self):
        """Creates a string for the description. This is required to display description in Admin."""
        return self.text[:120] + '...'

    display_text.short_description = 'Текст'

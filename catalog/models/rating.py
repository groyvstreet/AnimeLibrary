from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import User
from catalog.models.anime import Anime


class Rating(models.Model):
    number = models.IntegerField('Рейтинг', default=0, help_text='Введите число', validators=[
        MinValueValidator(
            limit_value=0,
            message='Минимум 0'
        ),
        MaxValueValidator(
            limit_value=5,
            message='Максимум 5'
        )
    ])
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['anime']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return str(self.number)

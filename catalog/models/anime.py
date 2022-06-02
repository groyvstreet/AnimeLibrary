from django.core.validators import URLValidator, MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import User
from catalog.models.genre import Genre
from catalog.models.status import Status


class Anime(models.Model):
    title = models.CharField('Название', max_length=100)
    genre = models.ManyToManyField(Genre)
    date = models.DateField('Дата выхода', help_text='Введите дату выхода аниме')
    episodes_number = models.IntegerField('Эпизоды', default=1, help_text='Введите количество эпизодов', validators=[
        MinValueValidator(
            limit_value=1,
            message='Минимум 1'
        )
    ])
    episode_duration = models.IntegerField(
        'Длительность эпизода', default=1,
        help_text='Введите длительность эпизода, мин.',
        validators=[
            MinValueValidator(
                limit_value=1,
                message='Минимум 1'
            )
        ])
    average_rating = models.FloatField('Рейтинг', default=0, validators=[
        MinValueValidator(
            limit_value=0,
            message='Минимум 0'
        ),
        MaxValueValidator(
            limit_value=5,
            message='Максимум 5'
        )
    ])
    description = models.TextField('Описание', max_length=100000, blank=True, help_text='Введите описание')
    image = models.CharField('Источник изображения', max_length=1000, validators=[
        URLValidator(
            message='Введите url ссылку на изображение'
        )
    ])
    user = models.ManyToManyField(User, blank=True)
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['-date']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return self.title

    def display_genre(self):
        """Creates a string for the Genre. This is required to display genre in Admin."""
        return ', '.join([genre.name for genre in self.genre.all()])

    display_genre.short_description = 'Жанр'

    def display_description(self):
        """Creates a string for the description. This is required to display description in Admin."""
        return self.description[:80] + '...'

    display_description.short_description = 'Описание'

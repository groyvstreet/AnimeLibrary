from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

# Create your models here.


class Genre(models.Model):
    name = models.CharField('Название', max_length=100, help_text='Введите название жанра')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Anime(models.Model):
    title = models.CharField('Название', max_length=100)
    genre = models.ManyToManyField(Genre)
    date = models.DateField('Дата выхода', help_text='Введите дату выхода аниме')
    episodes_number = models.IntegerField('Эпизоды', default=0, help_text='Введите количество эпизодов')
    episode_duration = models.IntegerField('Длительность эпизода', default=0,
                                           help_text='Введите длительность эпизода, мин.')
    average_rating = models.FloatField('Рейтинг', default=0)
    description = models.TextField('Описание', max_length=100000, blank=True, help_text='Введите описание')
    image = models.CharField('Источник изображения', max_length=1000, blank=True)
    user = models.ManyToManyField(User)

    STATUS = (
        ('i', 'Выходит'),
        ('o', 'Вышло'),
    )

    status = models.CharField('Статус', max_length=1, choices=STATUS, default='i')

    class Meta:
        ordering = ['-date']

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

    def get_absolute_url(self):
        return reverse('anime_detail', args=(self.id,))


class Comment(models.Model):
    date = models.DateTimeField('Время', null=True, auto_now_add=True)
    text = models.TextField('Текст',  max_length=100000, help_text='Введите комментарий')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.text

    def display_text(self):
        """Creates a string for the description. This is required to display description in Admin."""
        return self.text[:120] + '...'

    display_text.short_description = 'Текст'


class Rating(models.Model):
    number = models.IntegerField('Рейтинг', default=0, help_text='Введите число')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.number)

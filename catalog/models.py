from django.db import models

# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=150)


class Comment(models.Model):
    text = models.CharField(max_length=1000)


class Anime(models.Model):
    title = models.CharField('Название', max_length=150)
    description = models.CharField('Описание', max_length=1000, blank=True)
    episodes_number = models.IntegerField('Эпизоды', default=0)
    episode_duration = models.IntegerField('Длительность эпизода', default=0)
    date = models.DateField()
    genre = models.ManyToManyField(Genre)
    rating = models.FloatField('Рейтинг', default=0)

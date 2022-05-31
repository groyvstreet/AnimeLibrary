# Generated by Django 4.0.4 on 2022-05-30 22:07

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0020_alter_anime_average_rating_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='image',
            field=models.CharField(max_length=1000, validators=[django.core.validators.URLValidator(message='Введите url ссылку на изображение')], verbose_name='Источник изображения'),
        ),
        migrations.AlterField(
            model_name='genre',
            name='name',
            field=models.CharField(help_text='Введите название жанра', max_length=100, validators=[django.core.validators.RegexValidator(message='Некорректный ввод', regex='^([А-ЯЁ]{1}[а-яё]*|[A-Z]{1}[a-z]*)$')], verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='status',
            name='name',
            field=models.CharField(help_text='Введите название жанра', max_length=100, validators=[django.core.validators.RegexValidator(message='Некорректный ввод', regex='^([А-ЯЁ]{1}[а-яё]*|[A-Z]{1}[a-z]*)$')], verbose_name='Название'),
        ),
    ]

# Generated by Django 4.0.4 on 2022-05-24 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0006_alter_genre_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='anime',
            name='image',
            field=models.TextField(blank=True, max_length=10000, verbose_name='Источник изображения'),
        ),
    ]
# Generated by Django 4.0.4 on 2022-05-24 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0007_anime_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='image',
            field=models.CharField(blank=True, max_length=1000, verbose_name='Источник изображения'),
        ),
    ]
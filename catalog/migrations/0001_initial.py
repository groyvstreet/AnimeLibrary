# Generated by Django 4.0.4 on 2022-05-16 11:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('date', models.DateField(help_text='Введите дату выхода аниме', verbose_name='Дата выхода')),
                ('episodes_number', models.IntegerField(default=0, help_text='Введите количество эпизодов', verbose_name='Эпизоды')),
                ('episode_duration', models.IntegerField(default=0, help_text='Введите длительность эпизода, мин.', verbose_name='Длительность эпизода')),
                ('rating', models.FloatField(default=0, verbose_name='Рейтинг')),
                ('description', models.TextField(blank=True, help_text='Введите описание', max_length=100000, verbose_name='Описание')),
                ('status', models.CharField(choices=[('i', 'Выходит'), ('o', 'Вышло')], default='i', max_length=1, verbose_name='Статус')),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Введите название жанра', max_length=100, verbose_name='Название')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Время')),
                ('text', models.TextField(help_text='Введите комментарий', max_length=100000)),
                ('anime', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='catalog.anime')),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.AddField(
            model_name='anime',
            name='genre',
            field=models.ManyToManyField(to='catalog.genre'),
        ),
    ]

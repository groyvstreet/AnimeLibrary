from django.core.validators import RegexValidator
from django.db import models


class Status(models.Model):
    name = models.CharField('Название', max_length=100, help_text='Введите название жанра', validators=[
        RegexValidator(
            regex=r'^([А-ЯЁ]{1}[а-яё]*|[A-Z]{1}[a-z]*)$',
            message='Некорректный ввод'
        )
    ])

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['name'])
        ]

    def __str__(self):
        return self.name

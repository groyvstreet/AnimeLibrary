# Generated by Django 4.0.4 on 2022-05-18 19:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0004_comment_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='genre',
            options={'ordering': ['-name']},
        ),
    ]

# Generated by Django 4.0.4 on 2022-05-30 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0014_alter_anime_user'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='anime',
            index=models.Index(fields=['title'], name='catalog_ani_title_f0c84b_idx'),
        ),
        migrations.AddIndex(
            model_name='anime',
            index=models.Index(fields=['status'], name='catalog_ani_status__7af421_idx'),
        ),
        migrations.AddIndex(
            model_name='comment',
            index=models.Index(fields=['anime'], name='catalog_com_anime_i_6b13b2_idx'),
        ),
        migrations.AddIndex(
            model_name='genre',
            index=models.Index(fields=['name'], name='catalog_gen_name_351426_idx'),
        ),
        migrations.AddIndex(
            model_name='rating',
            index=models.Index(fields=['anime'], name='catalog_rat_anime_i_cf44cc_idx'),
        ),
        migrations.AddIndex(
            model_name='rating',
            index=models.Index(fields=['user'], name='catalog_rat_user_id_f06350_idx'),
        ),
        migrations.AddIndex(
            model_name='status',
            index=models.Index(fields=['name'], name='catalog_sta_name_81838a_idx'),
        ),
    ]

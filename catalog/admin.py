from django.contrib import admin
from .models import Anime
from .models import Genre
from .models import Comment


# Register your models here.


@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'display_genre', 'date', 'episodes_number', 'episode_duration', 'rating',
                    'display_description', 'status', 'image')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title', 'description')
    list_filter = ('genre', 'date', 'episodes_number', 'episode_duration', 'rating', 'status')
    fields = [('title', 'status', 'image'), ('date', 'episodes_number', 'episode_duration'), ('user', 'genre',
                                                                                              'description')]


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('id', 'name')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'display_text', 'user', 'anime')
    list_display_links = ('id', 'display_text')
    search_fields = ('id', 'text')
    list_filter = ('date', 'anime')

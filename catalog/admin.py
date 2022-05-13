from django.contrib import admin
from .models import Anime

# Register your models here.


class AnimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'episodes_number', 'date', 'rating')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title', 'description')


admin.site.register(Anime, AnimeAdmin)

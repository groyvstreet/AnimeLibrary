from rest_framework import serializers
from catalog.models.anime import Anime


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'

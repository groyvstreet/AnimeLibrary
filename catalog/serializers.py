from rest_framework import serializers
from .models import Anime
from .models import Genre
from .models import Comment


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ('title', 'genre', 'date', 'episodes_number', 'episode_duration', 'description', 'status')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

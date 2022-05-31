from rest_framework import serializers
from .models import Anime, Rating, Status
from .models import Genre
from .models import Comment
from django.contrib.auth.models import User


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'id', 'username', 'first_name', 'last_name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class UserAnimesSerializer(serializers.Serializer):
    anime = serializers.IntegerField()

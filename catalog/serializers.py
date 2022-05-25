from rest_framework import serializers
from .models import Anime
from .models import Genre
from .models import Comment
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'id', 'username', 'first_name', 'last_name']


class CommentSerializer(serializers.ModelSerializer):
    #user = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'


class IssueTokenRequestSerializer(serializers.Serializer):
    model = User

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['key']

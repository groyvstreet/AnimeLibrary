from rest_framework import serializers


class UserAnimesSerializer(serializers.Serializer):
    anime = serializers.IntegerField()

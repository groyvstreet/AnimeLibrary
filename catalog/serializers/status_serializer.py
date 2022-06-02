from rest_framework import serializers
from catalog.models.status import Status


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

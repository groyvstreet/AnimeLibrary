from rest_framework import viewsets, permissions
from catalog.api.permissions.readonly import ReadOnly
from catalog.models.status import Status
from catalog.serializers.status_serializer import StatusSerializer


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]

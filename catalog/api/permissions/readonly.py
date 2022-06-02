from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnly(BasePermission):
    """Read only permission for unauthorized users"""
    def has_permission(self, request, view) -> bool:
        return request.method in SAFE_METHODS

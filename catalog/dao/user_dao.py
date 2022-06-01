from django.contrib.auth.models import User


class UserDao:
    @staticmethod
    def get_by_id(user_id):
        return User.objects.get(id=user_id)

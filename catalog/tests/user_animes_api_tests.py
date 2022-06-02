from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import RequestsClient
from catalog.models.anime import Anime


class UserAnimesAPITestCase(TestCase):
    def setUp(self):
        self.url = 'http://127.0.0.1:8000/api/users/1/animes/'
        self.user = User.objects.create(
            username='user',
            password='12'
        )
        self.anime = Anime.objects.create(
            title='anime',
            date='1999-09-01'
        )

    def test_user_animes_get(self):
        client = RequestsClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_user_animes_post_unauthorized(self):
        client = RequestsClient()
        response = client.post(self.url)
        self.assertEqual(response.status_code, 401)

    def test_user_animes_post_authorized(self):
        token = Token.objects.create(user=self.user)
        client = RequestsClient()
        client.headers["Authorization"] = f'Token {token}'
        response = client.post(self.url, json={'anime': self.anime.id})
        self.assertEqual(response.status_code, 200)

    def test_user_animes_delete_unauthorized(self):
        client = RequestsClient()
        response = client.delete(self.url, json={'anime': self.anime.id})
        self.assertEqual(response.status_code, 401)

    def test_user_animes_delete_authorized(self):
        token = Token.objects.create(user=self.user)
        client = RequestsClient()
        client.headers["Authorization"] = f'Token {token}'
        response = client.delete(self.url, json={'anime': self.anime.id})
        self.assertEqual(response.status_code, 200)

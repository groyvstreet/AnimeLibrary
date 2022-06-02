from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import RequestsClient
from catalog.models.anime import Anime


class RatingAPITestCase(TestCase):
    def setUp(self):
        self.url = 'http://127.0.0.1:8000/api/ratings/'

    def test_ratings_get(self):
        client = RequestsClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_ratings_post_unauthorized(self):
        client = RequestsClient()
        response = client.post(self.url)
        self.assertEqual(response.status_code, 401)

    def test_ratings_post_authorized(self):
        anime = Anime.objects.create(
            title='anime',
            date='1999-09-01'
        )
        user = User.objects.create(
            username='user',
            password='12'
        )
        token = Token.objects.create(user=user)
        client = RequestsClient()
        client.headers["Authorization"] = f'Token {token}'
        response = client.post(self.url, json={'number': '1', 'user': user.id, 'anime': anime.id})
        self.assertEqual(response.status_code, 200)

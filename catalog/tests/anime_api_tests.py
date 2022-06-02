from django.test import TestCase
from rest_framework.test import RequestsClient


class AnimeAPITestCase(TestCase):
    def setUp(self):
        self.url = 'http://127.0.0.1:8000/api/animes/'

    def test_animes_get(self):
        client = RequestsClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_animes_post(self):
        client = RequestsClient()
        response = client.post(self.url)
        self.assertEqual(response.status_code, 401)

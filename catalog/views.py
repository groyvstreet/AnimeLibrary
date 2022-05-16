from django.shortcuts import render
from .models import Anime
from .models import Genre
from .models import Comment

# Create your views here.


def index(request):
    """Функция отображения для домашней страницы сайта."""

    animes = Anime.objects.all().filter(status__exact='i')
    return render(request, 'index.html', context={'animes': animes})

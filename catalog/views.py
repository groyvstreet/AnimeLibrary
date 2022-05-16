from django.shortcuts import render
from django.views import generic
from .models import Anime
from .models import Genre
from .models import Comment

# Create your views here.


def index(request):
    """Функция отображения для домашней страницы сайта."""

    animes = Anime.objects.all().filter(status__exact='i')
    return render(request, 'catalog/index.html', context={'animes': animes})


class AnimeListView(generic.ListView):
    model = Anime
    paginate_by = 10


class AnimeDetailView(generic.DetailView):
    model = Anime

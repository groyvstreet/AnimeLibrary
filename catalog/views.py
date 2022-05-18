from django.shortcuts import render
from django.views import generic
from .models import Anime
from .models import Genre
from .models import Comment
from django.http import Http404, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

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


def detail(request, pk):
    pass
    #return render(request, 'catalog/anime_detail.html', context={'anime': anime, 'user'})


@login_required
def comment(request, pk):
    if request.method == 'POST':
        try:
            anime = Anime.objects.get(id=pk)
            user = User.objects.get(id=request.POST['user_id'])
        except Anime.DoesNotExist:
            raise Http404('Аниме не найдено!')
        except User.DoesNotExist:
            raise Http404('Пользователь не найден!')
        except:
            raise Http404('Страница не найдена!')
        anime.comment_set.create(text=request.POST['comment'], user=user)
        return HttpResponseRedirect(anime.get_absolute_url())
    else:
        try:
            anime = Anime.objects.get(id=pk)
        except Anime.DoesNotExist:
            raise Http404('Аниме не найдено!')
        except:
            raise Http404('Страница не найдена!')
        return HttpResponseRedirect(anime.get_absolute_url())

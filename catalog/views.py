from django.shortcuts import render
from django.views import generic
from .models import Anime
from .models import Genre
from .models import Comment
from django.http import Http404, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models import Q
import datetime

# Create your views here.


def index(request):
    """Функция отображения для домашней страницы сайта."""

    animes = Anime.objects.all().filter(status__exact='i')
    return render(request, 'catalog/index.html', context={'animes': animes})


class FilterAttributes:
    """View for filters"""
    @staticmethod
    def get_genres():
        return Genre.objects.all()

    @staticmethod
    def get_dates():
        return Anime.objects.order_by('-date').values_list('date', flat=True).distinct()

    @staticmethod
    def get_ep_num():
        return Anime.objects.order_by('-episodes_number').values_list('episodes_number', flat=True).distinct()

    @staticmethod
    def get_ep_duration():
        return Anime.objects.order_by('-episode_duration').values_list('episode_duration', flat=True).distinct()

    @staticmethod
    def get_ratings():
        return Anime.objects.order_by('-rating').values_list('rating', flat=True).distinct()

    @staticmethod
    def get_statuses():
        return Anime.objects.order_by('status').values_list('status', flat=True).distinct()


class AnimeListView(FilterAttributes, generic.ListView):
    model = Anime
    paginate_by = 10


class AnimeDetailView(generic.DetailView):
    model = Anime


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


class FilterAnimesView(FilterAttributes, generic.ListView):
    def get_queryset(self):
        # queryset = Anime.objects.filter(
        #     Q(genre__in=self.request.GET.getlist('genre')),
        #     Q(date__in=self.request.GET.getlist('date')),
        #     Q(episodes_number__in=self.request.GET.getlist('episodes_number')),
        #     Q(episode_duration__in=self.request.GET.getlist('episode_duration')),
        #     Q(rating__in=self.request.GET.getlist('rating')),
        #     Q(status__in=self.request.GET.getlist('status'))
        # ).distinct()
        # genre = Anime.objects.filter(genre__in=self.request.GET.getlist('genre'))
        # date = Anime.objects.filter(date__in=self.request.GET.getlist('date'))
        # episodes_number = Anime.objects.filter(episodes_number__in=self.request.GET.getlist('episodes_number'))
        # episode_duration = Anime.objects.filter(episode_duration__in=self.request.GET.getlist('episode_duration'))
        # rating = Anime.objects.filter(rating__in=self.request.GET.getlist('rating'))
        # status = Anime.objects.filter(status__in=self.request.GET.getlist('status'))
        # queryset = genre.union(date, episodes_number, episode_duration, rating, status)
        # return queryset
        kwargs = {}
        if self.request.GET.getlist("genre"):
            kwargs["genre__in"] = self.request.GET.getlist("genre")
        if self.request.GET.getlist("date"):
            kwargs["date__in"] = self.request.GET.getlist("date")
        if self.request.GET.getlist("episodes_number"):
            kwargs["episodes_number__in"] = self.request.GET.getlist("episodes_number")
        if self.request.GET.getlist("episode_duration"):
            kwargs["episode_duration__in"] = self.request.GET.getlist("episode_duration")
        if self.request.GET.getlist("rating"):
            kwargs["rating__in"] = self.request.GET.getlist("rating")
        if self.request.GET.getlist("status"):
            kwargs["status__in"] = self.request.GET.getlist("status")
        return Anime.objects.filter(**kwargs)

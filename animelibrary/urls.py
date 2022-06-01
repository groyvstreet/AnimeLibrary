"""animelibrary URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from catalog import api, views
from catalog.views import activate

router = routers.DefaultRouter()
router.register(r'animes', api.AnimeViewSet, 'animes')
router.register(r'genres', api.GenreViewSet, 'genres')
router.register(r'statuses', api.StatusViewSet, 'statuses')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('catalog.urls')),
    path('api/', include(router.urls)),
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken')),
    path('api/comments/', api.CommentView.as_view()),
    path('api/users/<int:pk>/animes/', api.UserAnimesView.as_view()),
    path('api/ratings/', api.RatingView.as_view()),
    path('activation/<uid>/<token>/', activate),
]

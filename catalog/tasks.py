import catalog.service
from animelibrary.celery import app


@app.task
def send(username, anime_id, anime_title):
    catalog.service.send(username, anime_id, anime_title)

import {useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Loader from "../components/Loader";
import AnimesList from "../AnimesList";
import AnimesFilter from "../components/AnimesFilter";
import React from "react";
import CommentsService from "../API/CommentsService";
import CommentItem from "../components/CommentItem";

function Anime() {
    const params = useParams()
    const [anime, setAnime] = useState({})
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [id, setId] = useState(0)

    const [loadAnime, isAnimeLoading] = useLoading(async () => {
        const anime = await AnimesService.getById(params.id)
        setAnime(anime)
        setId(anime.id)
        const comments = await CommentsService.getAll()
        setComments(comments.filter((comment) => comment.anime == params.id))
    })

    useEffect(() => {
        loadAnime()
    }, [])

    const addComment = (e) => {
        e.preventDefault()
        const newComment = {
            text,
            anime: id,
        }
        setComments([newComment, ...comments])
        setText('')
        CommentsService.post(newComment)
    }

    return (
        <div>
            {isAnimeLoading
                ?
                <div className="App">
                    <Loader/>
                </div>
                :
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-sm-offset-1" style={{padding: '0px'}}>
                            <h1>{anime.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-1" style={{padding: '0px'}}>
                            <div className="card mb-2">
                                <div className="row card-body">
                                    <div className="col-sm-4">
                                        <img src="https://dere.shikimori.one/system/animes/original/5114.jpg?1644323535"
                                             alt=""/>
                                    </div>
                                    <div className="col-sm-4">
                                        <p><strong>Жанр: </strong>{anime.genre}</p>
                                        <p><strong>Год выхода: </strong>{anime.date}</p>
                                        <p><strong>Статус: </strong><strong
                                            className={anime.status === 'i' ? 'text-warning' : 'text-success'}>{anime.status === 'i' ? 'Выходит' : 'Вышло'}
                                        </strong>
                                        </p>
                                        <p><strong>Эпизоды: </strong>{anime.episodes_number}</p>
                                        <p><strong>Длительность эпизода: </strong>{anime.episode_duration}</p>
                                        <p><strong>Рейтинг: </strong>{anime.rating}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        asd
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h2>Описание</h2>
                                    {anime.description}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h2>Отзывы</h2>
                            <hr/>
                            <form>
                                <textarea
                                    className="form-control mb-1"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder="Введите комментарий"
                                ></textarea>
                                <input type="hidden" name="user_id" value="{{ user.id }}"/>
                                <button className="btn btn-outline-success" onClick={addComment}>
                                    Отправить
                                </button>
                            </form>
                            {comments.map((comment) =>
                                <CommentItem comment={comment} key={comment.id}/>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Anime

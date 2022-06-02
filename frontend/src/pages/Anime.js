import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Loader from "../components/Loader";
import React from "react";
import CommentsService from "../API/CommentsService";
import CommentItem from "../components/CommentItem";
import {AuthContext} from "../context";
import GenresService from "../API/GenresService";
import UsersService from "../API/UsersService";
import StarRating from "../components/StarRating";
import RatingsService from "../API/RatingsService";
import {isUndefined} from "axios/lib/utils";
import StatusesService from "../API/StatusesService";

function Anime() {
    const {isAuth, user} = useContext(AuthContext)
    const params = useParams()
    const [anime, setAnime] = useState({})
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [id, setId] = useState(0)
    const [genres, setGenres] = useState('')
    const [isAdded, setIsAdded] = useState(false)
    const [rating, setRating] = useState(0.)
    const [status, setStatus] = useState({})

    const [loadAnime, isAnimeLoading] = useLoading(async () => {
        const anime = await AnimesService.getById(params.id)
        setAnime(anime)
        setId(anime.id)
        let temp_genres = await GenresService.getAll()
        temp_genres = temp_genres.filter((genre) => anime.genre.indexOf(genre.id) !== -1)
        let temp = ''
        for (let i = 0; i < temp_genres.length; i++) {
            temp += ', ' + temp_genres[i].name
        }
        setGenres(temp.slice(2))
        const comments = await CommentsService.getAll()
        setComments(comments.filter((comment) => comment.anime == params.id))
    })

    const [loadUserAnimes, isUserAnimesLoading] = useLoading(async () => {
        const userAnimes = await UsersService.getAnimes(user.id, '', '')
        setIsAdded(userAnimes.filter((userAnime) => userAnime.id === anime.id).length === 1)
    })

    const [loadRating, isRatingLoading] = useLoading(async () => {
        const ratings = await RatingsService.get(anime.id, user.id)
        if (ratings.length) {
            setRating(ratings[0].number)
        }
    })

    const [loadStatus, isStatusLoading] = useLoading(async () => {
        const status = await StatusesService.getById(anime.status)
        setStatus({
            name: status.name,
            color: status.name === 'Вышло' ? 'text-success' : 'text-warning'
        })
    })

    useEffect(() => {
        loadAnime()
    }, [])

    useEffect(() => {
        loadUserAnimes()
        if (!isUndefined(user.id)) {
            loadRating()
            loadStatus()
        }
    }, [user, anime])

    const addComment = (e) => {
        e.preventDefault()
        setText('')
        if (isAuth) {
            const newComment = {
                user: user.id,
                text,
                anime: id,
            }
            setComments([newComment, ...comments])
            const token = localStorage.getItem('token')
            CommentsService.post(newComment, token)
            loadAnime()
        } else {
            window.location.replace('http://localhost:3000/login')
        }
    }

    const removeFromUser = () => {
        if (isAuth) {
            UsersService.removeAnime(user.id, anime.id, localStorage.getItem('token')).then((response) => {
                return response.json()
            })
            loadAnime()
        } else {
            window.location.replace('http://localhost:3000/login')
        }
    }

    const addToUser = () => {
        if (isAuth) {
            UsersService.addAnime(user.id, anime.id, localStorage.getItem('token')).then((response) => {
                return response.json()
            })
            loadAnime()
        } else {
            window.location.replace('http://localhost:3000/login')
        }
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
                            <div className="card border-light mb-2"
                                 style={{boxShadow: '5px 10px 20px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5)'}}>
                                <div className="row card-body">
                                    <div className="col-sm-4">
                                        <img src={anime.image} alt=""/>
                                    </div>
                                    <div className="col-sm-4">
                                        <p><strong>Жанр: </strong>{genres}</p>
                                        <p><strong>Год выхода: </strong>{new Date(anime.date).toLocaleDateString()}</p>
                                        <p><strong>Статус: </strong><strong
                                            className={status.color}>{status.name}
                                        </strong>
                                        </p>
                                        <p><strong>Эпизоды: </strong>{anime.episodes_number}</p>
                                        <p><strong>Длительность эпизода: </strong>{anime.episode_duration}</p>
                                        <p><strong>Рейтинг: </strong>{anime.average_rating}</p>
                                    </div>
                                    <div className="col-sm-4 text-right">
                                        {!isAdded
                                            ?
                                            <button className="btn btn-success"
                                                    onClick={() => addToUser()}>Добавить</button>
                                            :
                                            <button className="btn btn-danger"
                                                    onClick={() => removeFromUser()}>Удалить</button>
                                        }
                                        <StarRating rating={rating} loadAnime={loadAnime}/>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-light">
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
                                    className="form-control mb-1 is-valid"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder="Введите комментарий"
                                ></textarea>
                                <input type="hidden" name="user_id" value="{{ user.id }}"/>
                                <button className="btn btn-success" onClick={addComment}>
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

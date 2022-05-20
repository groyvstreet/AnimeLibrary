import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLoading} from "../hooks/useLoading";
import AnimesService from "../API/AnimesService";
import Loader from "../components/Loader";
import AnimesList from "../AnimesList";
import AnimesFilter from "../components/AnimesFilter";

function Anime() {
    const params = useParams()
    const [anime, setAnime] = useState({})
    const [loadAnime, isAnimeLoading] = useLoading(async () => {
        const anime = await AnimesService.getById(params.id)
        setAnime(anime)
    })

    useEffect(() => {
        loadAnime()
    }, [])

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
                            <div>Card</div>
                        </div>
                        <div className="col-sm-4">
                            <div>Comments</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Anime

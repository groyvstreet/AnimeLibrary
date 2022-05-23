import AnimeItem from "./components/AnimeItem";

function AnimesList({animes}) {
    if (!animes.length) {
        return (
            <div>
                <h5>
                    Не найдено
                </h5>
                <div style={{paddingLeft: '180px'}}>
                    <img src="https://vkclub.su/_data/stickers/persik/sticker_vk_persik_017.png" alt=""/>
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            {animes.map((anime) =>
                <AnimeItem anime={anime} key={anime.id}/>
            )}
        </div>
    )
}

export default AnimesList

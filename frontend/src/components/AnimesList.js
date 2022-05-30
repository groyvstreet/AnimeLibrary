import AnimeItem from "./AnimeItem";

function AnimesList({animes}) {
    if (animes.length) {
        return (
            <div className="row">
                {animes.map((anime) =>
                    <AnimeItem anime={anime} key={anime.id}/>
                )}
            </div>
        )
    }

    return (
        <div>
            <h5>
                Не найдено
            </h5>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src="https://vkclub.su/_data/stickers/persik/sticker_vk_persik_017.png" alt=""/>
            </div>
        </div>
    )
}

export default AnimesList

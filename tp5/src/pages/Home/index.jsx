import React from "react";
import { Simple, List, Featured } from "../../components";
import { songMockup, podcastMockup, playlistMock } from "./mocks"

const Page = () => (
    <div className="page">
        <h1>Bienvenido</h1>
        <Featured
            title="Albums Recomendados"
        />
        <div className="separacion"></div>
        <List
            data={playlistMock}
            type="playlist"
            title="Mi Playlist"
            classname="playlist-list-home container"
        />
        <div className="separacion"></div>
        <Simple
            title="Elegidos para ti"
            id={1}
            cards={songMockup}
        />
        <div className="separacion"></div>
        <Simple
            title="Los últimos podcast"
            id={2}
            cards={podcastMockup}
        />
    </div>
)

export default Page;
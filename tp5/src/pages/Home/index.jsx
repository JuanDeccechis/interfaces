import React from "react";
import { Simple, List, Featured } from "../../components";
import { songMockup, podcastMockup, playlistMock } from "./mocks"

const Page = () => (
    <div className="page">
        <Featured
            title="Recomendados"
        />
        <List
            data={playlistMock}
            type="playlist"
            title="Mi Playlist"
            classname="playlist-list-home"
        />
        <Simple
            title="Elegidos para ti"
            cards={songMockup}
        />

        <Simple
            title="Los últimos podcast"
            cards={podcastMockup}
        />
    </div>
)

export default Page;
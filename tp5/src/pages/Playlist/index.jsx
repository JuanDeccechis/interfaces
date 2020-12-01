import React from "react";
import {Comments, Presentation, List} from "../../components";
import { commentsMockup, playlistMock} from "./mocks"

const Playlist = () => (
<div className="page">
<h1>Playlist</h1>
            <Presentation title="Safaera" subtitle="Bad Bunny"/>
            <div className="separacion"></div>
            <div className="information">
                <List
                data={playlistMock}
                type="playlist"
                title="Mi Playlist"
                classname="playlist-list-home"
            />
            </div>
            <div className="separacion"></div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
    </div>
)


export default Playlist;
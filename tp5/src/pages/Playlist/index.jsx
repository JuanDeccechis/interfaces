import React from "react";
import {Comments, Presentation, List} from "../../components";
import { commentsMockup, playlistMock} from "./mocks"

const Playlist = () => (
<div className="page">
        <div className="page-content">
            <Presentation title="Safaera" subtitle="Bad Bunny"/>
            <div className="information">
                <List
                data={playlistMock}
                type="playlist"
                title="Mi Playlist"
                classname="playlist-list-home"
            />
            </div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
        </div>
    </div>
)


export default Playlist;
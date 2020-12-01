import React from "react";
import {Comments, Presentation, List} from "../../components";
import { commentsMockup, playlistMock} from "./mocks"

const Album = () => (
<div className="page">
<h1>Album</h1>
            <Presentation title="Niburi" subtitle="Ozuna"/>
            <div className="separacion"></div>
            <div className="information container">
                <List
                data={playlistMock}
                type="playlist"
                classname="playlist-list-album"
            />
            </div>
            <div className="separacion"></div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
    </div>
)


export default Album;
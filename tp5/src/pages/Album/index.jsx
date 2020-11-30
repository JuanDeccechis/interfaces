import React from "react";
import {Comments, Presentation, List} from "../../components";
import { commentsMockup, playlistMock} from "./mocks"

const Album = () => (
<div className="page">
            <Presentation title="Niburi" subtitle="Ozuna"/>
            <div className="separacion"></div>
            <div className="information">
                <List
                data={playlistMock}
                type="playlist"
                classname="playlist-list-home"
            />
            </div>
            <div className="separacion"></div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
    </div>
)


export default Album;
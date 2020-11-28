import React from "react";
import {Comments, Presentation, List} from "../../components";
import { commentsMockup, playlistMock} from "./mocks"

const Album = () => (
<div className="page">
        <div className="page-content">
            <Presentation title="Niburi" subtitle="Ozuna"/>
            <div className="information">
                <List
                data={playlistMock}
                type="playlist"
                classname="playlist-list-home"
            />
            </div>
            <div className="commentsContainer">
                <Comments data={commentsMockup}/>
            </div>
        </div>
    </div>
)


export default Album;
import React from "react";
import {Comments, Information, Presentation} from "../../components";
import { commentsMockup, informationTitlesMockup, informationDataMockup } from "./mocks"

const Song = () => (
    <div className="page">
        <h1>Cancion</h1>
            <Presentation title="Safaera" subtitle="Bad Bunny" isDeletable={false}/>
            <div className="separacion"></div>
            <div className="information">
                <Information titles={informationTitlesMockup} details={informationDataMockup}/>
            </div>
            <div className="separacion"></div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
        
    </div>
)


export default Song;
import React from "react";
import {Comments, Information, Presentation} from "../../components";
import { commentsMockup, informationTitlesMockup, informationDataMockup } from "./mocks"

const Song = () => (
    <div className="page">
        <div className="page-content">
            <Presentation title="Safaera" subtitle="Bad Bunny"/>
            <div className="information">
                <Information titles={informationTitlesMockup} details={informationDataMockup}/>
            </div>
            <div className="commentsContainer">
                <Comments data={commentsMockup}/>
            </div>
        </div>
    </div>
)


export default Song;
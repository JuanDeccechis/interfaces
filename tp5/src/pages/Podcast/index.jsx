import React from "react";
import {Comments, Information, Presentation} from "../../components";
import { commentsMockup, informationTitlesMockup, informationDataMockup } from "./mocks"

const Podcast = () => (
    <div className="page">
        <h1>Podcast</h1>
            <Presentation title="La sociedad de Thule" subtitle="Sociedades secretas"/>
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


export default Podcast;
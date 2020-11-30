import React from "react";
import {Comments, Information, Presentation} from "../../components";
import { commentsMockup, informationTitlesMockup, informationDataMockup } from "./mocks"

const Podcast = () => (
    <div className="page">
        <div className="page-content">
            <Presentation title="La sociedad de Thule" subtitle="Sociedades secretas"/>
            <div className="information">
                <Information titles={informationTitlesMockup} details={informationDataMockup}/>
            </div>
            <div className="commentsContainer container">
                <Comments data={commentsMockup}/>
            </div>
        </div>
    </div>
)


export default Podcast;
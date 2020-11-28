import React from "react";
import CardMedia from '@material-ui/core/CardMedia';
import { songMockup} from "./mocks"
import Options from "../Options/Options";

const Presentation = ({title, subtitle}) => (
    <div className="presentation">
        <div className="image"> 
            <CardMedia
                    component="img"
                    height={songMockup.height}
                    image={songMockup.img}
                    className="card-image"
                />
        </div>
        <div className="songTitle">
                {title}
            <div className="songSubitle">
                {subtitle}
            </div>
        </div>
        <div>
            <Options />
        </div>
    </div>
)

export default Presentation;
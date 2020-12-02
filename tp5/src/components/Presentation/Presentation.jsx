import React from "react";
import CardMedia from '@material-ui/core/CardMedia';
import { songMockup} from "./mocks"
import Options from "../Options/Options";
import Rating from "../Rating/Rating";

const Presentation = ({title, subtitle, isDeletable}) => (
    <div className="presentation">
        <div className="image"> 
            <CardMedia
                    component="img"
                    height={songMockup.height}
                    image={songMockup.img}
                    className="card-image"
                />
        </div>
        <div className="songInfo">
            <div>
                <h2> {title} </h2>
                <p> {subtitle} </p>
                <Rating />
            </div>
            <Options isDeletable={isDeletable}/>
        </div>
    </div>
)

export default Presentation;
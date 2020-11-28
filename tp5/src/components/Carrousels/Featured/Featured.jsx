import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { images } from "./mock";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Featured = ({ title }) => {

    const [featured, setFeatured] = useState(2);

    const handleClick = (index) => {
        if (images[featured + index]) {
            setFeatured(featured + index)
        }
    }

    const getIfShows = (i) => {
        return (i === featured || i === (featured - 1) || i === (featured + 1));
    }

    return (
        <div className="carrousel-featured">
            <div className="content">
                <div onClick={() => handleClick(-1)} className="control">
                    <ArrowBackIosIcon />
                </div>
                <div className="carrusel-images">
                    {images.map((img, i) =>
                        getIfShows(i) &&
                        < img src={img} className={`carrusel-image-${i} ${i === featured && "featured"}`} onClick={() => setFeatured(i)} />)}
                </div>
                <div onClick={() => handleClick(1)} className="control">
                    <ArrowForwardIosIcon />
                </div>
            </div>

            <Typography component="h2" variant="h3" >
                {title}
            </Typography>
        </div>
    )
}

export default Featured;
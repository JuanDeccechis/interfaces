import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GradeIcon from '@material-ui/icons/Grade'; //estrellas con relleno

export default function Rating({commentRating}) {
    const [show, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(3);
  
    const showDetails = (rating) => {
        if (rating) {
            setOpenDetails(false);
            setRating(rating);
        } else {
            setOpenDetails(true);
        }
    };

    const setOpenDetails = (show) => {
        setOpen(show);
    };

    return (
        <div>
        {!commentRating ?
        <div className="rating">
            {!show ?
                <div className="show-more">
                        <StarBorderIcon onClick={() => setOpenDetails(true)} />
                    <span>
                        {rating} / 5
                    </span>
                </div>
            :
                <div className="show-more">
                    <StarBorderIcon onClick={() => showDetails(1)} />
                    <StarBorderIcon onClick={() => showDetails(2)} />
                    <StarBorderIcon onClick={() => showDetails(3)} />
                    <StarBorderIcon onClick={() => showDetails(4)} />
                    <StarBorderIcon onClick={() => showDetails(5)} />
                </div>
            }
        </div>
        :
        <div className="onlyWeb">
            <div className="show-more">
                        <StarBorderIcon/>
                    <span>
                        {rating} / 5
                    </span>
                </div>
        </div>
        }
        </div>
)}
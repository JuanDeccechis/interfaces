import React from "react";
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'; //corazon con relleno
import Rating from '../Rating/Rating';


const Options = () => (
    <div className="options" >
        <div className="top">
            <AddIcon />
            <ShareIcon />
            <FavoriteBorderIcon />
        </div>
        <div className="bottom">
            <Rating />
            <DeleteForeverIcon />
        </div>
    </div>
);


export default Options;
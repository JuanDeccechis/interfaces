import React from "react";
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'; //corazon con relleno


export default function Options() {
    const [isFavorite, setFavorite] = React.useState(false);

    return(
        <div className="options">
            <div> <AddIcon /></div>
            <div> <ShareIcon /></div>
            <div onClick={() => setFavorite(!isFavorite)}>
                        {isFavorite ? 
                            <FavoriteIcon />
                        :
                            <FavoriteBorderIcon />
                        }
                    </div>
            <div> <DeleteForeverIcon /></div>
        </div>
    );

}
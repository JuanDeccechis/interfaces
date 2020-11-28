import React from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const Card = ({ title, detail, img, height }) => {

    return (
        <MaterialCard className="card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={height}
                    image={img}
                    className="card-image"
                />
                <CardContent className="content">
                    <Typography gutterBottom variant="body2">
                        {title}
                    </Typography>
                    <br></br>
                    <Typography variant="body2">
                        {detail}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </MaterialCard>
    );
}
export default Card;
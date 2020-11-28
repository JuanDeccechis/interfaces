import React from "react";
import Card from "../../Card/Card";
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Simple = ({ title, cards }) => (
    <div className="carrousel-simple container">
        <Typography component="h2" variant="h3" >
            {title}
        </Typography>
        <div className="content">
            {cards.map(c =>
                <Card
                    {...c}
                />
            )}
        </div>
        <div className="actions">
            <ArrowForwardIcon />
        </div>
    </div>

)
export default Simple;
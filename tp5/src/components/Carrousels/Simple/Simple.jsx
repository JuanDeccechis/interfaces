import React from "react";
import Card from "../../Card/Card";
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Simple({ title, id, cards }) {
    const [showBack, setShowBack] = React.useState(false);
    const [showForward, setShowForward] = React.useState(true);

    const verCards = (nombre) => {
        switch (nombre) {
            case "atras":
                    document.querySelector(`.cardsAnimable${id}`).classList.add("animacion1");
                    document.querySelector(`.cardsAnimable${id}`).classList.remove("animacion2");
                    setShowBack(!showBack);
                    setShowForward(!showForward);
                break;
            case "siguiente":
                    document.querySelector(`.cardsAnimable${id}`).classList.remove("animacion1");
                    document.querySelector(`.cardsAnimable${id}`).classList.add("animacion2");
                    setShowBack(!showBack);
                    setShowForward(!showForward);
                break;
        
            default:
                break;
        }
        
    }
    
    return(
    <div className="carrousel-simple container">
        <Typography component="h2" variant="h3" >
            {title}
        </Typography>
        <div className={`content cardsAnimable${id}`}>
            {cards.map(c =>
                <Card
                    {...c}
                />
            )}
        </div>
        <div className={`actions ${showForward}`} >
            {showBack && 
                <ArrowBackIcon onClick={() => verCards("atras")}/>
            }
            {showForward &&
                <ArrowForwardIcon onClick={() => verCards("siguiente")}/>
            }
        </div>
    </div>

)
}



/*
@keyframes desplazarDesdeDerecha {
    from {left: 100%;}
    to {left: 0;}
}

.animaEntrada1 {
    animation-name: desplazarDesdeDerecha;
    animation-duration: 2s;
}*/
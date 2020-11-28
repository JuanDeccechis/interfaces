import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  export default function Popup({title, text, textButton}) {
    const [open, setOpen] = React.useState(true);
    
    return (

    
        <Collapse  className="container popup" in={open}>
            <Alert variant="outlined" icon={false} className="popup-size"
                action={
                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                        >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
               <div>
                 <h1>
              {title}
                 </h1>
                 <p>
                 {text}
                 </p>
                 <Button variant="contained" color="primary">
              {textButton}
                 </Button>
               </div>
            </Alert>
        </Collapse>




    );
  }


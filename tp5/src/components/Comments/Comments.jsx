import React from 'react';
import { List, Divider } from '@material-ui/core';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Comment from "./Comment"
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Comments = ({data}) => (
    <>
    <div className="title">
        <h2>Comentarios</h2>
        <div className="dejarComentario">
            <ListItemAvatar>
                <Avatar alt="username" src={`/static/images/avatar/juan.jpg`} />
            </ListItemAvatar>
            <div className="comments">
                <ListItemText
                    primary="Deja tu comentario"
                />
                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Escribe aqui tu comentario" />
            </div>
        </div>
    </div>
        <List className="comments">
            <Divider variant="inset" component="li" />
            {data &&
            data.map(commentItem => 
                <div>
                    <Comment username={commentItem.username} comment={commentItem.comment} likes={commentItem.likes} unlikes={commentItem.unlikes}/>
                    <Divider variant="inset" component="li" />
                </div>
            )}
        </List>
        <ExpandMoreOutlinedIcon />
        <div className="endComments"></div>
    </>
);
export default Comments;
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const Comment = ({ username, comment, likes, unlikes }) => {

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="username" src={`/static/images/avatar/${username}.jpg`} />
            </ListItemAvatar>
            <ListItemText
                primary={username}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="h3"
                            color="textPrimary"
                        >
                        </Typography>
                        {comment}
                    </React.Fragment>
                }
            />
            <div>
                <ThumbUpAltOutlinedIcon /> {likes}
                <ThumbDownOutlinedIcon /> {unlikes}
            </div>
        </ListItem>
    );
}

export default Comment;


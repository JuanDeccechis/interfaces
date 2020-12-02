import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Rating from "../Rating/Rating";

export default function Comment({ username, comment, likes, unlikes }) {
    const [like, setLike] = React.useState(false);
    const [unlike, setUnlike] = React.useState(false);

    return (
        <ListItem>
            <div className="commentIcon">
                <ListItemAvatar>
                    <Avatar alt="username" src={`/static/images/avatar/${username}.jpg`} />
                </ListItemAvatar>
            </div>
            <ListItemText>
                <span className="commentTitle">
                    {username}
                </span>
                <React.Fragment>
                    <p>
                    {comment}
                    </p>
                        
                    </React.Fragment>
            </ListItemText>

            <div>
                <span onClick={() => setLike(!like)}>
                    {like ? 
                        <span> <ThumbUpIcon /> {likes+1} </span>
                    :
                        <span> <ThumbUpAltOutlinedIcon /> {likes} </span>
                    }
                </span>
                <span onClick={() => setUnlike(!unlike)}>
                    {unlike ? 
                        <span> <ThumbDownIcon /> {unlikes+1} </span>
                    :
                        <span> <ThumbDownOutlinedIcon /> {unlikes} </span>
                    }
                </span>
                <Rating commentRating={true}/>
            </div>
        </ListItem>
    );
}


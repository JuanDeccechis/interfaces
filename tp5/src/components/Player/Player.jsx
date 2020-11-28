import React from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LoopIcon from '@material-ui/icons/Loop';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Player = () => (
    <div className="player" >
        <LoopIcon />
        <div className="player-commands">
            <SkipPreviousIcon />
            <PlayArrowIcon />
            <SkipNextIcon />
        </div>
        <div className="show-more">
            <KeyboardArrowUpIcon className="show-more-icon" />
            <KeyboardArrowUpIcon className="show-more-icon" />
            <KeyboardArrowUpIcon className="show-more-icon" />
        </div>
    </div>
);


export default Player;
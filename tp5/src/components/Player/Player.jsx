import React from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LoopIcon from '@material-ui/icons/Loop';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PauseIcon from '@material-ui/icons/Pause';


export default function Player() {
    const [isPlay, setPlay] = React.useState(true);


    return (
        <div className="player" >
            <LoopIcon />
            <div className="player-commands">
                <SkipPreviousIcon className="player-commands-icons"/>
                <span onClick={() => setPlay(!isPlay)}>
                    {isPlay ? 
                        <PauseIcon className="player-commands-icons"/>
                    :
                        <PlayArrowIcon className="player-commands-icons"/>
                    }
                </span>
                <SkipNextIcon className="player-commands-icons"/>
            </div>
            <div className="show-more">
                <KeyboardArrowUpIcon className="show-more-icon" />
                <KeyboardArrowUpIcon className="show-more-icon" />
                <KeyboardArrowUpIcon className="show-more-icon" />
            </div>
        </div>
    );
}
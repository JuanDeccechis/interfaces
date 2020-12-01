import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Avatar } from '@material-ui/core';
import Menu from "../Menu/Menu";

const Toolbar = () => {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className="toolbar">
            <MenuIcon onClick={() => setMenuActive(!menuActive)} />
            {menuActive &&
                <div className="menuDesplegable">
                    <Menu />
                </div>
            }
            <div className="right">
                <a href="/interfaces/search">
                    <SearchIcon />
                </a>
                <NotificationsNoneIcon />
                <Avatar />
            </div>
        </div>
    );
}

export default Toolbar;
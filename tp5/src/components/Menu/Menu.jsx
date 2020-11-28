import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from "@material-ui/core";

    export default function  Menu ({}) {
        
        return(
            <List className="menu" position="absolute">
                <ListItem button component="a" href="/interfaces/">
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/song">
                    <ListItemText primary="Cancion" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/playlist">
                    <ListItemText primary="Playlist" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/podcast">
                    <ListItemText primary="Podcast" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/album">
                    <ListItemText primary="Album" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/search">
                    <ListItemText primary="Busquedas - Calificaciones" />
                </ListItem>
                <Divider />
            </List>
        )}

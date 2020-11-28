import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from "@material-ui/core";

    export default function  Menu ({}) {
        
        return(
            <List className="menu" position="absolute">
                <ListItem button component="a" href="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/song">
                    <ListItemText primary="Cancion" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/playlist">
                    <ListItemText primary="Playlist" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/podcast">
                    <ListItemText primary="Podcast" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/album">
                    <ListItemText primary="Album" />
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/search">
                    <ListItemText primary="Busquedas - Calificaciones" />
                </ListItem>
                <Divider />
            </List>
        )}

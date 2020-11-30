import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from "@material-ui/core";

    export default function  Menu ({}) {
        
        return(
            <List className="menu" position="absolute">
                <ListItem button component="a" href="/interfaces/">
                    <ListItemText>
                        Home
                        </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/song">
                    <ListItemText>
                        Cancion
                        </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/playlist">
                    <ListItemText>
                        Playlist
                        </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/podcast">
                    <ListItemText>
                        Podcast
                        </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/album">
                    <ListItemText>
                        Album
                        </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/interfaces/search">
                    <ListItemText>
                        Busquedas
                        </ListItemText>
                </ListItem>
                <Divider />
            </List>
        )}

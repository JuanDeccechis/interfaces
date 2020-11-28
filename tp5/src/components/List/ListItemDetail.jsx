import React from 'react';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';


export default function ListItemDetail({ listType }) {

    const getItemsIcon = () => {
        switch (listType) {
            case "playlist":
                return ["Ver playlist", "Modificar", "Compartir", "Eliminar"]
            case "cancion":
                return ["Ver canción", "Modificar", "Compartir", "Eliminar"]
            default:
                break;
        }
    }

    return (
        <List component="ul"  className="list-item-detail">
            { getItemsIcon() && getItemsIcon().map(item =>
                <ListItem button>
                    <ListItemText primary={item} />
                </ListItem>
            )}
        </List>
    );
}
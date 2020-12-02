import React from 'react';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


export default function ListItemDetail({ listType, setSearchResults }) {
    const [searchInSongs, setSearchInSongs] = React.useState(true);
    const [searchInPodcast, setSearchInPodcast] = React.useState(true);
    const [searchInPlaylist, setSearchInPlaylist] = React.useState(true);
    const [searchInAlbum, setSearchInAlbum] = React.useState(true);

    const getItemsIcon = () => {
        switch (listType) {
            case "playlist":
                return ["Ver playlist", "Modificar", "Compartir", "Eliminar"]
            case "cancion":
                return ["Ver cancion", "Modificar", "Compartir", "Eliminar"]
            case "search":
                return [{title: "Cancion", checked: searchInSongs}, {title: "Podcast", checked: searchInPodcast}, {title: "Playlist", checked: searchInPlaylist}, {title: "Album", checked: searchInAlbum}]
            default:
                break;
        }
    }

    const asd = (item) => {
        setSearchResults(item.title);
        switch (item.title) {
            case "Cancion":
              return setSearchInSongs(!searchInSongs);
            case "Podcast":
              return setSearchInPodcast(!searchInPodcast);
            case "Playlist":
              return setSearchInPlaylist(!searchInPlaylist);
            case "Album": 
              return setSearchInAlbum(!searchInAlbum);
            default:
                break;
        }
    }

    return (
        <List component="ul"  className="list-item-detail">
            { listType==="search" && getItemsIcon() && getItemsIcon().map(item =>
                <ListItem button  onClick={()=> asd(item)}>
                    <ListItemText>
                        {listType === "search" && item.checked &&
                            <CheckBoxIcon className={"checkBoxIconsPosition"} />
                        }
                        {listType === "search" && !item.checked &&
                            <CheckBoxOutlineBlankIcon className={"checkBoxIconsPosition"} />
                        }
                        {item.title}
                        </ListItemText>
                </ListItem>
            )}
            { listType!=="search" && getItemsIcon() && getItemsIcon().map(item =>
                <ListItem button>
                    <ListItemText>
                        {item}
                        </ListItemText>
                </ListItem>
            )}
        </List>
    );
}
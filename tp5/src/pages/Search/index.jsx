import React from "react";
import { Simple, List, Checkbox } from "../../components";
import { searchTypeMockup, searchGenreMockup, songMockup, podcastMockup, playlistMockup } from "./mocks"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Search({  }) {
  const [searchInSongs, setSearchInSongs] = React.useState(true);
  const [searchInPodcast, setSearchInPodcast] = React.useState(true);
  const [searchInPlaylist, setSearchInPlaylist] = React.useState(true);
  const [searchInAlbum, setSearchInAlbum] = React.useState(true);
  const classes = useStyles();

  const setSearchResults = (resultType) => {
    switch (resultType) {
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
    <div className="page">
      <h1>Busquedas</h1>
      <Paper component="form" className={classes.root}>
        <IconButton type="submit" className="black" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Buscar"
          inputProps={{ 'aria-label': "Buscar" }}
        />
      </Paper>
      <div className="separacion"></div>
      <div className="information container">
        <h2>Filtros</h2>
                <List
                data={searchTypeMockup}
                classname="playlist-list-album"
                type="search"
                setSearchResults={setSearchResults}
            />
            <Checkbox />
      </div>

      {searchInSongs &&
      <div>
        <div className="separacion"></div>
          <Simple
              title="Canciones"
              id={1}
              cards={songMockup}
          />
      </div>
      }
      {searchInPodcast &&
        <div>
          <div className="separacion"></div>
          <Simple
              title="Podcast"
              id={2}
              cards={podcastMockup}
          />
        </div>
      }
      {searchInPlaylist &&
        <div>
          <div className="separacion"></div>
          <Simple
              title="Playlist"
              id={3}
              cards={playlistMockup}
          />
        </div>
      }
      {searchInAlbum &&
        <div>
          <div className="separacion"></div>
          <Simple
              title="Album"
              id={4}
              cards={podcastMockup}
          />
        </div>
      }

    </div>
  )
};

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
    width: 400,
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

const Search = () => {
  const classes = useStyles();
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
            />
            <Checkbox />
      </div>
      <div className="separacion"></div>
        <Simple
            title="Canciones"
            id={1}
            cards={songMockup}
        />
        <div className="separacion"></div>
        <Simple
            title="Podcast"
            id={2}
            cards={podcastMockup}
        />
        <div className="separacion"></div>
        <Simple
            title="Playlist"
            id={3}
            cards={playlistMockup}
        />
        <div className="separacion"></div>
        <Simple
            title="Album"
            id={4}
            cards={podcastMockup}
        />

    </div>
  )
};

export default Search;
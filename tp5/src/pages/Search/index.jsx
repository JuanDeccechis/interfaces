import React from "react";
import { List } from "../../components";
import { searchMockup } from "./mocks"
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
                data={searchMockup}
                type="playlist"
                classname="playlist-list-album"
                type="search"
            />
        </div>

    </div>
  )
};

export default Search;
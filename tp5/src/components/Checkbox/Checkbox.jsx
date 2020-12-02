/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { genreOptionsMockup} from "./mocks"

export default function Checkbox() {
    return (
        <Autocomplete
        id="checkbox"
        options={genreOptionsMockup}
        getOptionLabel={(option) => option.genre}
        classes={{
            option: "misOptions",
        }}
        renderInput={(params) => <TextField {...params} label="Genero" variant="outlined" />}
        />
    );
}

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Home, Song, Playlist, Podcast, Album, Search } from "../../pages";

const Routes = () => (
    <Router basename='/interfaces'>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/song" component={Song} />
            <Route path="/podcast" component={Podcast} />
            <Route path="/album" component={Album} />
            <Route path="/search" component={Search} />
        </Switch>
    </Router>
);


export default Routes;
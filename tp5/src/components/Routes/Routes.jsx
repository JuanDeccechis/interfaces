import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Home, Song } from "../../pages";

const Routes = () => (
    <Router basename='/interfaces/tp5'>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/song" component={Song} />
        </Switch>
    </Router>
);


export default Routes;
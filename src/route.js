import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Game from './containers/Game/Game';
import Configuration from "./containers/Configuration/Configuration";

const route = (
        <Switch>
            <Route path= "/configuration"
                   component={Configuration}/>
            <Route path= "/"
                   exact
                   component={Game}/>
            <Redirect to="/"/>
        </Switch>
    );

export default route;
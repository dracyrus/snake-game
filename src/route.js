import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Game from './containers/Game/Game';

const route = (
        <Switch>
            <Route path= "/"
                   exact
                   component={Game}/>
            <Redirect to="/"/>
        </Switch>
    );

export default route;
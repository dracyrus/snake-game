import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Inicio from './containers/Inicio/Inicio';

const route = (
        <Switch>
            <Route path= "/"
                   exact
                   component={Inicio}/>
            <Redirect to="/"/>
        </Switch>
    );

export default route;
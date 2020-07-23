import React from 'react';
import {withRouter} from 'react-router-dom';

import './App.css';

import route from './route';
import Layout from './hoc/Layout/Layout';

function App() {
    return (
        <div>
            <Layout>
                {route}
            </Layout>
        </div>
    );
}

export default withRouter(App);

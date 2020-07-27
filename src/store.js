import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import configReducer from './store/reducers/config';

import {loadState, saveState} from "./connectivity/localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    config: configReducer,
});

const persistedStore = loadState();

const store = createStore(rootReducer, persistedStore, composeEnhancers(
    applyMiddleware(thunk)
));

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
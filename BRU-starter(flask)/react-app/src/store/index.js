import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import session from './session'
import discussion from './discussions'
import posts from './posts'
import postCreate from './post_create'
import discussionCreate from './discussion_create'
import categories from './category'
import onePost from './onePost'


const rootReducer = combineReducers({
    session,
    discussion,
    posts,
    postCreate,
    discussionCreate,
    categories,
    onePost,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

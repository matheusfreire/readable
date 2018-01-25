import React from 'react'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import thunk from 'redux-thunk'
import multi from 'redux-multi'
import {Switch} from 'react-router'

import App from './App'
import post from './reducers/posts'
import categories from './reducers/categories'
import comments from './reducers/comments'
import { reducer as formReducer } from 'redux-form'


const history = createHistory()

const routerMiddlewareHistory = routerMiddleware(history)
const middlewares = [multi, thunk, routerMiddlewareHistory];

const store = createStore(
    combineReducers({
        routerReducer,
        postReducer: post,
        categoriesReducer: categories,
        commentReducer: comments,
        form: formReducer
    }),
    composeWithDevTools(applyMiddleware(...middlewares)),
)

const ConnectedSwitch = connect(state => ({
    location: state.location
}))(Switch)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)
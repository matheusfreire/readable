import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router'

import {Link} from 'react-router-dom'
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostShow from "./components/PostShow";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <Link to="/">Home</Link>
                    {' '}
                    <Link to="/about">About</Link>
                    {' '}
                    <Link to="/posts/new">New POST</Link>

                </header>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={() => (<h1>About TETEU</h1>)}/>
                    <Route path="/posts/new" component={PostForm}/>
                    <Route path="/posts/:id" component={PostShow}/>
                </Switch>

            </div>
        );
    }
}

export default App;

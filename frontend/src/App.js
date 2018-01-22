import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router'

import {Link} from 'react-router-dom'
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostShow from "./components/PostShow";
import Categories from './components/Categories';
import ListPostByCategory from './components/ListPostByCategory';

class App extends Component {

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <Link to="/">Home</Link>
                    {' '}
                    <Link to="/about">About</Link>
                    {' '}
                    <Link to="/posts/new">New POST</Link>
                    <br />
                    <Categories /> 

                </header>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={() => (<h1>About TETEU</h1>)}/>
                    <Route path="/posts/new" component={PostForm}/>
                    <Route path="/posts/:id" component={PostShow}/>
                    <Route path="/:category/posts" component={ListPostByCategory}/>
                </Switch>

            </div>
        );
    }
}

export default App

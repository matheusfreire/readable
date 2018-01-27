import React, { Component } from 'react';
import './App.css';
import { Route, Switch,withRouter } from 'react-router'

import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostShow from "./components/PostShow";
import Categories from './components/Categories';
import ListPostByCategory from './components/ListPostByCategory';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


class App extends Component {

    handleClickNewPost = () =>{
        this.props.history.push('/posts/new');
    }

    render() {
        let currentPath = window.location.pathname;
        return (
            <div className="App">

                <AppBar title="Readable" iconClassNameRight="muidocs-icon-navigation-expand-more">
                    <Categories />
                </AppBar>
               
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route path="/about" component={() => (<h1>About TETEU</h1>)} /> */}
                    <Route path="/posts/new" component={PostForm} />
                    <Route path="/posts/:id" component={PostShow} />
                    <Route path="/:category/posts" component={ListPostByCategory} />
                </Switch>
                {!currentPath.includes(`posts/new`) ? 
                    <FloatingActionButton className="fab" onClick={this.handleClickNewPost}>
                        <ContentAdd />
                    </FloatingActionButton>: ""
                }
            </div>
        );
    }
}

export default withRouter(App);

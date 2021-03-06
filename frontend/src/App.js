import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {compose} from 'redux';
import { Route, Switch,withRouter } from 'react-router';
import {open} from './actions/sidemenu';

import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostShow from "./components/PostShow";
import Categories from './components/Categories';
import ListPostByCategory from './components/ListPostByCategory';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SideMenu from './components/SideMenu';
import NotFound from './components/NotFound';

const titleStyle = {
    'textAlign': 'center',
}


class App extends Component {

    handleClickNewPost = () =>{
        this.props.history.push('/posts/new');
    }

    goHome= () => {
        this.props.history.push('/');
    }

    openDrawer = () => {
        this.props.open()
    }

    render() {
        let currentPath = window.location.pathname;
        return (
            <div className="App">

                <AppBar title="Readable" onTitleClick={() => {this.goHome()}} titleStyle={titleStyle} iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={() => {this.openDrawer()}}>
                    <Categories />
                </AppBar>
               
                <SideMenu />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/posts/new" component={PostForm} />
                    <Route exact path="/:category/:post_id/edit" component={PostForm} />
                    <Route exact path="/:category/:post_id" component={PostShow} />
                    <Route path="/:category" component={ListPostByCategory} />
                    <Route path='/' component={NotFound} />
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

const mapStateToProps = state => ({ open: state.sideMenuReducer.open })
const mapDispatchToProps = { open }
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App)

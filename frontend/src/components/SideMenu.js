import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { close } from '../actions/sidemenu';
import {getAllCategories} from '../actions/categories';

class SideMenu extends Component {


    close = () => {
        this.props.close();
    }

    clickHome(){
        this.props.history.push('/');
    }

    handleClick = (action) =>{
        switch(action){
            case 'home':
                return this.props.history.push('/');
            case 'newPost':
                return this.props.history.push('/posts/new');
            default:
                return this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="center">
                <Drawer open={this.props.open}>
                    <MenuItem onClick={() => {this.handleClick('home')}}>Home</MenuItem>
                    <MenuItem onClick={() => {this.handleClick('newPost')}}>New post</MenuItem>
                    <MenuItem>Topics
                        {this.props.categories.map((category) => (
                            <MenuItem key={category.path} value={category.path} primaryText={category.name} />
                        ))}
                    </MenuItem>
                    <MenuItem onClick={() => this.close()}>Close menu</MenuItem>
                </Drawer>



            </div>
        );
    }
}

const mapStateToProps = state => ({ open: state.sideMenuReducer.open,categories: state.categoriesReducer.categories })
const mapDispatchToProps = { close, getAllCategories }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu))
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { close } from '../actions/sidemenu';
import {getAllCategories} from '../actions/categories';
import FontAwesome from 'react-fontawesome';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const style = {
    paper: {
      display: 'inline-block',
      float: 'left',
      margin: '16px 32px 16px 0',
    },
    rightIcon: {
      textAlign: 'center',
      lineHeight: '24px',
    },
  };

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
            case 'react':
            case 'udacity':
            case 'redux':
                return this.props.history.push(`/${action}/posts`)
            default:
                return this.props.history.push('/');
        }
    }

    render() {
        return (
            <div style={style}>
                <Drawer open={this.props.open}>
                    <Menu>
                        <MenuItem onClick={() => {this.handleClick('home')}} leftIcon={<ActionHome />} primaryText="Home"/>
                    </Menu>
                    <Divider />
                    <Subheader>Topics</Subheader>
                    <Menu>
                        <MenuItem onClick={() => {this.handleClick('newPost')}} leftIcon={<AvPlaylistAdd />} primaryText="New post"/>
                        <Menu primarytext="Topics">
                            {this.props.categories.map((category) => (
                                <MenuItem leftIcon={<FontAwesome className="super-crazy-colors" name="fire"/>} 
                                  key={category.path} value={category.path} primaryText={category.name} onClick={() => {this.handleClick(category.path)}} />
                            ))}
                        </Menu>
                    </Menu>
                    <Divider />
                    <Menu>
                        <MenuItem onClick={() => this.close()} leftIcon={<NavigationClose />} primaryText="Close menu"/>
                    </Menu>
                </Drawer>



            </div>
        );
    }
}

const mapStateToProps = state => ({ open: state.sideMenuReducer.open,categories: state.categoriesReducer.categories })
const mapDispatchToProps = { close, getAllCategories }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu))
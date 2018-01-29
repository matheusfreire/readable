import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { close } from '../actions/sidemenu';
import {getAllCategories} from '../actions/categories';

class SideMenu extends Component {


    close = () => {
        this.props.close();
    }

    render() {
        return (
            <div className="center">
                <Drawer open={this.props.open}>
                    <MenuItem>New post</MenuItem>
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
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
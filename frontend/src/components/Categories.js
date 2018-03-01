import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {getAllCategories} from '../actions/categories';

import {withRouter} from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Categories extends Component {

    componentDidMount(){
        this.props.getAllCategories()
    }

    handleClick = (event, value) =>{
        let link = `/${value}`;
        this.props.history.push(link);
    }
    render() {
        const {categories} = this.props
        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onChange={this.handleClick}>
                {categories.map((category) => (
                    <MenuItem key={category.path} value={category.path} primaryText={category.name} />
                ))}
            </IconMenu>
        );
    }
}

const mapStateToProps = state => ({categories: state.categoriesReducer.categories})
const mapDispatchToProps = { getAllCategories}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Categories)
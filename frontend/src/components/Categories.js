import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import {getAllCategories} from '../actions/categories'

class Categories extends Component {

    state = {
        loading: true
    }

    componentDidMount(){
        this.props.getAllCategories().then(() => {
            this.setState({ loading: true})
        })
    }
    render() {

        const {categories, loading} = this.props

        return (
            <div>
                {loading ? (
                    <ReactLoading type="balls" color="#444"/>
                ): (
                    <div>
                        {categories.map((category) => (
                            <Link to={`/${category.path}/posts`}>{category.name}</Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({categories: state.categoriesReducer.categories})
const mapDispatchToProps = { getAllCategories}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
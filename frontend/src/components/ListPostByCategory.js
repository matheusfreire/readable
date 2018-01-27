import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getByCategory} from '../actions/post'
import CardPost from './CardPost';

class ListPostByCategory extends Component {


    componentDidMount(){
        this.props.getByCategory(this.props.match.params.category)
    }

    componentWillUpdate(){
        this.props.getByCategory(this.props.match.params.category)
    }

    render() {
        const { list } = this.props
        return (
            <div>
                {list.map((post) => (
                    <CardPost key={post.id} post={post}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.postReducer.list })
const mapDispatchToProps = { getByCategory }
export default connect(mapStateToProps, mapDispatchToProps)(ListPostByCategory)

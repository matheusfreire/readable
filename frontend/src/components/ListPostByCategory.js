import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getByCategory} from '../actions/post'

class ListPostByCategory extends Component {


    componentDidMount(){
        this.props.getByCategory(this.props.match.params.category)
    }

    componentWillMount(){
        this.props.getByCategory(this.props.match.params.category)
    }

    render() {
        const { list } = this.props
        return (
            <div>
                <h1>Home Posts</h1>
                {
                    list.map((post) => (
                        <div>
                            {post.body}
                            <br />
                            <Link to={`/posts/${post.id}`}>Show</Link>
                            <br />
                            <hr />
                        </div>
                    ))
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.postReducer.list })
const mapDispatchToProps = { getByCategory }
export default connect(mapStateToProps, mapDispatchToProps)(ListPostByCategory)

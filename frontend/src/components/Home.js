import React, { Component } from 'react';
import { connect } from 'react-redux'
import { search } from "../actions/post";
import { Link } from 'react-router-dom'

class Home extends Component {

    componentDidMount() {
        this.props.search()
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
const mapDispatchToProps = { search }
export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, {Component} from 'react';
import { connect } from 'react-redux'
import {get, votar} from '../actions/post'

class PostShow extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.get(this.props.match.params.id).then(() => {
            this.setState({ loading: false})
        })
    }

    handleClick = (post, type) => {
        this.props.votar(post, type)
    }

    render() {
        const post = this.props.objeto
        return (
            <div>
                <h1>POST SHOW - {post.category}</h1>
                {post.body}
                <hr />
                Score: {post.voteScore}
                <button onClick={() => this.handleClick(post, 'up')}>UP</button>
                <button onClick={() => this.handleClick(post, 'down')}>DOWN</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({objeto: state.postReducer.post})
const mapDispatchToProps = { get, votar }
export default connect(mapStateToProps, mapDispatchToProps)(PostShow)

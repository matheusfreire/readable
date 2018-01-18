import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getByPost, vote} from '../actions/comments'

class ListComments extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.getByPost(this.props.postId).then(() => {
            this.setState({ loading: false })
        })
    }

    handleClick = (comment, type) => {
        this.props.vote(comment, type)
    }

    render() {
        const {comments} = this.props
        return (
            <div>
                {this.state.loading ? (
                    <span>Carregando</span>
                ):(
                    <div>
                        {comments &&(
                            <div>
                            <h1>Comments SHOW</h1>
                                {comments.map((comment) => (
                                    <div>
                                        Comment: {comment.body} - Made by {comment.author}
                                        <button onClick={() => this.handleClick(comment, 'upVote')}>UP</button>
                                        <button onClick={() => this.handleClick(comment, 'downVote')}>DOWN</button>
                                    </div>
                                ))}
                            <hr />
                        </div>
                        )}
                    </div>
                )}
                
            </div>
        );
    }
}

const mapStateToProps = state => ({ comments: state.commentReducer.comments })
const mapDispatchToProps = { getByPost, vote}
export default connect(mapStateToProps, mapDispatchToProps)(ListComments)

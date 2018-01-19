import React, { Component } from 'react';
import { connect } from 'react-redux'
import { vote} from '../actions/comments'

class CommentShow extends Component {

    handleClick = (comment, type) => {
        this.props.vote(comment, type)
    }

    render() {
        const {comment} = this.props
        return (
            <div>
                {comment && (
                    <div>
                        Comment: {comment.body} - Made by {comment.author}
                        <br/>
                        Score: {comment.voteScore}
                        <button onClick={() => this.handleClick(comment, 'upVote')}>UP</button>
                        <button onClick={() => this.handleClick(comment, 'downVote')}>DOWN</button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({ comment: state.commentReducer.comment })
const mapDispatchToProps = {vote}
export default connect(mapStateToProps, mapDispatchToProps)(CommentShow)

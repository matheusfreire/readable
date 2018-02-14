import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getByPost, vote} from '../actions/comments'

import CommentShow from './CommentShow';

import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

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
        const {comments, message} = this.props
        return (
            <div>
                {this.state.loading ? (
                    <CircularProgress />
                ):(
                    <div>
                        {comments.length > 0 ?(
                            <div>
                                <Divider />
                                {comments.map((comment) => (
                                    <div key={comment.id}>
                                        <CommentShow key={comment.id} comment={comment} />
                                        <Divider />
                                        <br />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>Nothing to show</div>
                        )}
                        {message !== undefined ?
                                <Snackbar
                                    open={message !== ''}
                                    message={message}
                                    autoHideDuration={4000}
                                />
                                : ''
                        }
                    </div>
                )}
                
            </div>
        );
    }
}

const mapStateToProps = state => ({ comments: state.commentReducer.comments, message: state.commentReducer.messageComment })
const mapDispatchToProps = { getByPost, vote}
export default connect(mapStateToProps, mapDispatchToProps)(ListComments)

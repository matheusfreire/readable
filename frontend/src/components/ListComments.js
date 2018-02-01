import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getByPost, vote} from '../actions/comments'

import CommentShow from './CommentShow';

import Divider from 'material-ui/Divider';

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
                                <Divider />
                                {comments.map((comment) => (
                                    <div>
                                        <CommentShow key={comment.id} comment={comment} />
                                        <Divider />
                                        <br />
                                    </div>
                                ))}
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

import * as CommentApi from '../utils/CommentAPI';
import { GET_COMMENTS_POST, COMMENT_VOTED } from '../utils/ActionTypes';


export const getByPost = (postId) => {
    return (dispatch) => {
        return CommentApi.getAllByPost(postId).then((comments) => dispatch({ type: GET_COMMENTS_POST, comments: comments}))
    }
}

export const vote = (comment, vote) => {
    return (dispatch) => {
        return CommentApi.vote(comment, vote).then((result) => dispatch({ type: COMMENT_VOTED, commentVoted: result.comment }))
    }
}
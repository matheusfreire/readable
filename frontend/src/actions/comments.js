import * as CommentApi from '../utils/CommentAPI';
import { GET_COMMENTS_POST, COMMENT_VOTED, GET_COMMENT, ADD_COMMENT, OPEN_MODAL, CLOSE_MODAL, REMOVE_COMMENT, EDIT_COMMENT, UPDATE_COMMENT } from '../utils/ActionTypes';


export const getByPost = (postId) => {
    return (dispatch) => {
        return CommentApi.getAllByPost(postId).then((comments) => dispatch({ type: GET_COMMENTS_POST, comments: comments}))
    }
}

export const vote = (comment, vote) => {
    return (dispatch) => {
        return CommentApi.vote(comment, vote).then((result) => dispatch({ type: COMMENT_VOTED, comment: result }))
    }
}

export const get = (commentId) => {
    return (dispatch)=> {
        return CommentApi.get(commentId).then((comment) => dispatch({type:GET_COMMENT, comment: comment, messageComment: null}))
    }
}

export const create = (comment) => {
    return (dispatch) => {
        return CommentApi.create(comment).then((comment) => dispatch({type: ADD_COMMENT, comment: comment, messageComment: 'New comment added successfully'}))
    }
}

export const update = (comment) => {
    return (dispatch) => {
        return CommentApi.update(comment).then((comment) => dispatch({type: UPDATE_COMMENT, comment: comment, messageComment: 'New comment updated successfully'}))
    }
}

export const remove = (comment) => {
    return (dispatch) => {
        return CommentApi.remove(comment).then(() => dispatch({type: REMOVE_COMMENT, comment: comment, messageComment: 'New comment removed successfully'}))
    }
}

export const editComment = (comment) => {
    return {type: EDIT_COMMENT, comment: comment, messageComment: null}
}

export const openModal = () => {
    return {type: OPEN_MODAL, messageComment: null}
}

export const closeModal = () => {
    return {type: CLOSE_MODAL, messageComment: null}
}
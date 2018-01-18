
import * as PostsApi from '../utils/PostsAPI';
import {POSTS_LOADED, POSTS_SEARCHED, POSTS_VOTED} from "../utils/ActionTypes";

export const get = (postId) => {
    return (dispatch) => {
        return PostsApi.get(postId)
            .then((objeto) => dispatch({type: POSTS_LOADED, objetoPost: objeto}))
    }
}

export const search = () => {
    return (dispatch) => {
        return PostsApi.getAll()
            .then((posts) => dispatch({type: POSTS_SEARCHED, posts: posts}))
    }
}

export const votar = (post, type) => {
    let newScore = 0
    if(type === "up") {
        newScore = post.voteScore + 1
    } else {
        newScore = post.voteScore - 1
    }
    return {type: POSTS_VOTED, postVoted: {...post, voteScore: newScore }}
}
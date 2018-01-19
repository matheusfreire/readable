
import * as PostsApi from '../utils/PostsAPI';
import { POSTS_LOADED, POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_CREATED } from "../utils/ActionTypes";

export const get = (postId) => {
    return (dispatch) => {
        return PostsApi.get(postId)
            .then((objeto) => dispatch({ type: POSTS_LOADED, objetoPost: objeto }))
    }
}

export const getByCategory = (category) => {
    return (dispatch) => {
        return PostsApi.getAllByCategory(category).then((posts) => dispatch({ type: POSTS_SEARCHED_BY_CATEGORY, posts: posts }))
    }
}

export const search = () => {
    return (dispatch) => {
        return PostsApi.getAll()
            .then((posts) => dispatch({ type: POSTS_SEARCHED, posts: posts }))
    }
}


export const vote = (post, vote) => {
    return (dispatch) => {
        return PostsApi.vote(post, vote).then((post) => dispatch({ type: POST_VOTED, postVoted: post }))
    }
}

export const add = (id,timestamp,title, body, author, category) => {
    return (dispatch) => {
        return PostsApi.create(id,timestamp,title,body,author,category).then((post) => dispatch({type: POST_CREATED, post: post}))
    }
}

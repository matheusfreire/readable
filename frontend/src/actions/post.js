
import * as PostsApi from '../utils/PostsAPI';
import { push } from 'react-router-redux'
import {POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_CREATED, POST_LOADED } from "../utils/ActionTypes";

export const get = (postId) => {
    return (dispatch) => {
        return PostsApi.get(postId)
            .then((objeto) => dispatch({ type: POST_LOADED, post: objeto }))
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

export const add = (post) => {
    return (dispatch) => {
        return PostsApi.create(post.id,post.timestamp,post.title,post.body,post.author,post.category).then((post) => dispatch({type: POST_CREATED, post: post, message: 'New post added successufully'}))
    }
}

export const update = (post) => {
    return (dispatch) => {
        return PostsApi.update(post.id,post.title,post.body,post.category).then((post) => {dispatch(push(`/${post.category}/${post.id}`))})
    }
}
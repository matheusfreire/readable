import {POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_LOADED, POST_CREATED, POST_UPDATED} from '../utils/ActionTypes'

const INITIAL_STATE = {
    post: {},
    list: [],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case POST_LOADED:
            return {...state, post: action.post}
        case POST_UPDATED:
        case POST_CREATED:
            return {...state, post: action.post}
        case POSTS_SEARCHED:
            return { ...state, list: action.posts}
        case POSTS_SEARCHED_BY_CATEGORY:
            return { ...state, list: action.posts}
        case POST_VOTED:
            return { ...state, post: action.postVoted}
        default:
            return state
    }
}
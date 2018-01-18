import {POSTS_SEARCHED, POSTS_LOADED, POST_VOTED} from '../utils/ActionTypes'

const INITIAL_STATE = {
    post: {},
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case POSTS_SEARCHED:
            return { ...state, list: action.posts }
        case POSTS_LOADED:
            return { ...state, post: action.objetoPost }
        case POST_VOTED:
            return { ...state, post: action.postVoted }
        default:
            return state
    }
}
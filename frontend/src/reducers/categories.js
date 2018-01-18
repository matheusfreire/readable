import {GET_CATEGORIES} from '../utils/ActionTypes'

const INITIAL_STATE = {
    categories: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            return { ...state, categories: action.categories }
        default:
            return state
    }
}
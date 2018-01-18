import { GET_COMMENTS_POST, COMMENT_VOTED } from "../utils/ActionTypes";


const INITIAL_STATE = {
    comment: {},
    comments: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COMMENTS_POST:
            return { ...state, comments: action.comments}
        case COMMENT_VOTED:
            return { ...state, comment: action.commentVoted }
        default:
            return state
    }
}
import { GET_COMMENTS_POST, COMMENT_VOTED, GET_COMMENT, ADD_COMMENT} from "../utils/ActionTypes";


const INITIAL_STATE = {
    comment: {},
    comments: [],
    commentModalOpen: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COMMENTS_POST:
            return { ...state, comments: action.comments}
        case COMMENT_VOTED:
            let newComments = state.comments.map((c) => {
                if (c.id === action.commentVoted.id) {
                    return action.commentVoted;
                }
                return c
            })
            return { ...state, comments: newComments }
        case GET_COMMENT:
            return { ...state, comment: action.comment }
        case ADD_COMMENT:
            return {...state, comments: action.comments.push(action.comment) }
        default:
            return state
    }
}
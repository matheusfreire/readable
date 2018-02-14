import { GET_COMMENTS_POST, COMMENT_VOTED, GET_COMMENT, ADD_COMMENT, OPEN_MODAL, CLOSE_MODAL, REMOVE_COMMENT, EDIT_COMMENT, UPDATE_COMMENT} from "../utils/ActionTypes";


const INITIAL_STATE = {
    comment: {},
    comments: [],
    commentModalOpen: false,
    messageComment: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COMMENTS_POST:
            return { ...state, comments: action.comments, messageComment: action.message}
        case UPDATE_COMMENT:
        case COMMENT_VOTED:
            let newComments = state.comments.map((c) => {
                if (c.id === action.comment.id) {
                    return action.comment;
                }
                return c
            })
            return { ...state, comments: newComments, messageComment: action.message}
        case EDIT_COMMENT:
            return {...state, comment: action.comment, commentModalOpen: true}
        case GET_COMMENT:
            return { ...state, comment: action.comment, messageComment: action.message }
        case ADD_COMMENT:
            return {...state, comments: [...state.comments,action.comment], commentModalOpen: false, messageComment: action.message}
        case REMOVE_COMMENT:
            return {...state, comments: state.comments.filter((c) => c.id !== action.comment.id), messageComment: action.message}
        case OPEN_MODAL:
            return {...state, commentModalOpen: true, messageComment: action.message}
        case CLOSE_MODAL:
            return {...state, commentModalOpen: false, messageComment: action.message}
        default:
            return state
    }
}
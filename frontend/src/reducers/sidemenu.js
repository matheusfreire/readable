import { OPEN_SIDE_MENU, CLOSE_SIDE_MENU } from "../utils/ActionTypes";

const INITIAL_STATE = {
    open: true
}


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case OPEN_SIDE_MENU:
            return { ...state, open: action.open }
        case CLOSE_SIDE_MENU:
            return {...state, open: action.open}
        default:
            return state
    }
}
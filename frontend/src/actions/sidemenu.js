import { OPEN_SIDE_MENU, CLOSE_SIDE_MENU } from "../utils/ActionTypes";

export const open = () => {
    return { type: OPEN_SIDE_MENU, open: true }
}

export const close = () => {
    return { type: CLOSE_SIDE_MENU, open: false }
}
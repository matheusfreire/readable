import * as CategoryAPI from '../utils/CategoryAPI';

import { GET_CATEGORIES } from "../utils/ActionTypes";

export const getAllCategories = () => {
    return (dispatch) => {
        return CategoryAPI.getAll().then((result) => dispatch({ type: GET_CATEGORIES, categories: result.categories }))
    }
}
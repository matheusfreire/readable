import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

import * as actions from '../../actions/sidemenu'
import {OPEN_SIDE_MENU, CLOSE_SIDE_MENU } from "../../utils/ActionTypes";
const middlewares = [multi, thunk]
const mockStore = configureStore(middlewares)

describe('Sidemenu actions',() => {

    it('open menu and dispatch OPEN_SIDE_MENU', () => {
        const expectedActions = { type: OPEN_SIDE_MENU,open: true }
        const store = mockStore({ open: false})

        expect(actions.open()).toEqual(expectedActions)
    })

    it('close menu and dispatch CLOSE_SIDE_MENU', () => {
        const expectedActions = { type: CLOSE_SIDE_MENU,open: false }
        const store = mockStore({ open: false})

        expect(actions.close()).toEqual(expectedActions)
    })
})
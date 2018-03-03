import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../../actions/categories'
import { api, headers} from '../../utils/Api'
import { GET_CATEGORIES } from '../../utils/ActionTypes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const categories = [
    {
        name: 'react',
        path: 'react'
    },
    {
        name: 'redux',
        path: 'redux'
    },
    {
        name: 'udacity',
        path: 'udacity'
    }
]

describe('actions', async () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('GetCategories should dispatch a GET_CATEGORIES action', () => {
        fetchMock.once('end:/categories', {body: {categories: categories}, headers })

        const expectedActions = [{ type: GET_CATEGORIES, categories }]
        const store = mockStore({ categories: [] })

        return store.dispatch(actions.getAllCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
import reducer from '../../reducers/categories'
import * as types from '../../utils/ActionTypes'


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

describe('Categories reducer', () => {

    it('INITIAl STATE', () => {
        expect(reducer(undefined, {})).toEqual({categories: []})
    })

    it('GET_CATEGORIES', () => {
        expect(
            reducer([], {
                type: types.GET_CATEGORIES,
                categories
            })
        ).toEqual({categories: categories})
    })

})
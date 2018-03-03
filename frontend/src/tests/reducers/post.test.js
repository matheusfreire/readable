import reducer from '../../reducers/posts'
import {POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_CREATED, POST_LOADED, POST_UPDATED, POST_REMOVED, POSTS_ORDERED_DOWN_VOTED } from "../../utils/ActionTypes";

const INITIAL_STATE = {
    post: {},
    list: []
}

const post1 = {
    id: 'asd123',
    timestamp: Date.now(),
    title: 'TEST IN REDUX IS AWESOME',
    body: 'Everybody say that',
    author: 'Jest Developer',
    category: 'redux',
    voteScore: 0,
}

const post2 = {
    id: 'asd124',
    timestamp: Date.now(),
    title: 'TESTE IN REACT + REDUX WITH ENZYME',
    body: 'Everyone say so',
    author: 'Enzyme developer',
    category: 'redux',
    voteScore: 0,
}

describe('Posts reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })


    it('handle POST_SEARCHED', () => {
        const posts = [post1, post2]
        expect(
            reducer({}, {
                type: POSTS_SEARCHED,
                posts
            })
        ).toEqual({list: posts})
    })

    it('handle POST_BY_CATEGORY', () => {
        const posts = [post1]
        expect(reducer({}, {
                type: POSTS_SEARCHED_BY_CATEGORY,
                posts
            })
        ).toEqual({list: posts})
    })

    it('handle POST_LOADED', () => {
        expect(
            reducer({}, {
                type: POST_LOADED,
                post: post1
            })
        ).toEqual({post: post1})
    })

    xit('handle POST_VOTED', () => {
        const postVoted = {...post1, voteScore: 1}
        const state = { ...INITIAL_STATE, post: post1 }
        const expectedState = { ...INITIAL_STATE, post: postVoted }
        expect(
            reducer(state, {
                type: POST_VOTED,
                post: post1
            })
        ).toEqual(expectedState)
    })
    

    it('handle POST_REMOVED', () => {
        const state = { list: [post1] }
        expect(
            reducer(state, {
                type: POST_REMOVED,
                post: post1
            })
        ).toEqual({list: []})
    })

})
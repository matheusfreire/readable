import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import fetchMock from 'fetch-mock'

import * as actions from '../../actions/post'
import { api, headers} from '../../utils/Api'
import {POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_CREATED, POST_LOADED, POST_UPDATED, POST_REMOVED } from "../../utils/ActionTypes";

const middlewares = [multi, thunk]
const mockStore = configureStore(middlewares)

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

const posts = [post1, post2]


describe('Post Actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('get all posts and dispatch POSTS_SEARCHED', () => {

        fetchMock.once('end:/posts', {body: posts, headers })

        const expectedActions = [{ type: POSTS_SEARCHED, posts }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.search()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('get all posts by category and dispatch POSTS_SEARCHED_BY_CATEGORY', () => {

        fetchMock.once('end:/posts', {body: [post1], headers })

        const expectedActions = [{ type: POSTS_SEARCHED_BY_CATEGORY, posts: [post1] }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.getByCategory('redux')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('get post and dispatch POST_LOADED', () => {

        fetchMock.once('end:/posts/asd123', {body: post1, headers })

        const expectedActions = [{ type: POST_LOADED, post: post1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.get('asd123')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('create a new post and dispatch POST_CREATED', () => {

        fetchMock.once('end:/posts', {body: post1, headers })

        const expectedActions = [{ type: POST_CREATED, post: post1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.add(post1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('update a post and dispatch POST_UPDATED', () => {

        const postUpdated = { ...post1, body: "TEST IN REDUX IS AWESOME UPDATED"}
        const expectedActions = [{ type: POST_UPDATED, post: postUpdated }]
        const store = mockStore({ posts: [] })

        fetchMock.once('end:/posts/asd123', {body: postUpdated, headers })

        return store.dispatch(actions.update(postUpdated)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('delete a post and dispatch POST_REMOVED', () => {

        fetchMock.once('end:/posts/asd123', {body: post1, headers })

        const expectedActions = [{ type: POST_REMOVED, post: post1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.remove(post1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('Up vote on post and dispatch POST_VOTED', () => {

        const postVoted = { ...post1, voteScore: 1}
        const expectedActions = [{ type: POST_VOTED, postVoted: postVoted }]
        const store = mockStore({ posts: [] })

        fetchMock.once('end:/posts/asd123', {body: postVoted, headers })

        return store.dispatch(actions.vote(post1, 'upVote')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})
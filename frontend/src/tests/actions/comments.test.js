import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import fetchMock from 'fetch-mock'

import * as actions from '../../actions/comments'
import { api, headers} from '../../utils/Api'
import { GET_COMMENTS_POST, COMMENT_VOTED, GET_COMMENT, ADD_COMMENT, OPEN_MODAL, CLOSE_MODAL, REMOVE_COMMENT, UPDATE_COMMENT } from '../../utils/ActionTypes';

const middlewares = [multi, thunk]
const mockStore = configureStore(middlewares)

const comment1 = {
    id: 'qwerty123',
    timestamp: Date.now(),
    body: 'COMMENT BODY TEST JEST',
    author: 'JEST',
    voteScore: 0,
    parentId: 'asd123'
}

const comment2 = {
    id: 'qwerty124',
    timestamp: Date.now(),
    body: 'COMMENT BODY TEST ENZYME',
    author: 'ENZYME',
    voteScore: 0,
    parentId: 'asd123'
}

const comments = [comment1, comment2]


describe('Comments Actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('fetch all comments using post dispatch GET_COMMENTS_POST', () => {

        fetchMock.once('end:/posts/asd123/comments', {body: comments, headers })

        const expectedActions = [{ type: GET_COMMENTS_POST, comments }]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.getByPost('asd123')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('create a new comment and dispatch ADD_COMMENT', () => {

        fetchMock.once('end:/comments', {body: comment1, headers })

        const expectedActions = [{ type: ADD_COMMENT, comment: comment1}]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.create(comment1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('update comment and dispatch UPDATE_COMMENT', () => {

        const commentUpdated = { ...comment1, body: "COMMENT BODY TEST JEST UPDATED"}
        const expectedActions = [{ type: UPDATE_COMMENT, comment: commentUpdated }]
        const store = mockStore({ comments: [] })

        fetchMock.once('end:/comments/qwerty123', {body: commentUpdated, headers })

        return store.dispatch(actions.update(commentUpdated)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('vote on comment and increase voteScore and dispatch COMMENT_VOTED', () => {

        const commentVoted = { ...comment1, voteScore: 1}
        const expectedActions = [{ type: COMMENT_VOTED, comment: commentVoted }]
        const store = mockStore({ comments: [] })

        fetchMock.once('end:/comments/qwerty123', {body: commentVoted, headers })

        return store.dispatch(actions.vote(comment1, 'upVote')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('delete a comment and dispatch a REMOVE_COMMENT', () => {

        fetchMock.once('end:/comments/qwerty124', {body: comment2, headers })

        const expectedActions = [{ type: REMOVE_COMMENT, comment: comment2 }]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.remove(comment2)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
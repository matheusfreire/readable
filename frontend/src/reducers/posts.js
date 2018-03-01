import {POSTS_SEARCHED, POST_VOTED, POSTS_SEARCHED_BY_CATEGORY, POST_LOADED, POST_CREATED, POST_UPDATED, POSTS_ORDERED_UP_VOTED, POSTS_ORDERED_DOWN_VOTED, POSTS_ORDERED_MORE_RECENT, POSTS_ORDERED_LESS_RECENT} from '../utils/ActionTypes'

const INITIAL_STATE = {
    post: {},
    list: [],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case POST_LOADED:
            return {...state, post: action.post}
        case POST_UPDATED:
        case POST_CREATED:
            return {...state, post: action.post}
        case POSTS_SEARCHED:
            return { ...state, list: action.posts}
        case POSTS_SEARCHED_BY_CATEGORY:
            return { ...state, list: action.posts}
        case POST_VOTED:
            return { ...state, post: action.postVoted}
        case POSTS_ORDERED_UP_VOTED:
            let posts = state.list.sort(orderByUpVoted);
            return {...state, list: posts}
        case POSTS_ORDERED_DOWN_VOTED:
            let newList = state.list.sort(orderByDownVoted);
            return {...state, list: newList}
        case POSTS_ORDERED_MORE_RECENT:
            let newListPost = state.list.sort(orderByTimestampRecent);
            return {...state, list: newListPost}
        case POSTS_ORDERED_LESS_RECENT:
            let newListOrdered = state.list.sort(orderByTimestampLessRecent);
            return {...state, list: newListOrdered}
        default:
            return state
    }
}

function orderByTimestampRecent(a,b){
    var aTimestamp = parseFloat(a.timestamp);
    var bTimestamp = parseFloat(b.timestamp);
   
    if(aTimestamp > bTimestamp)
        return -1;

    if(bTimestamp > aTimestamp)
        return 1;

    return 0;
}

function orderByTimestampLessRecent(a,b){
    var aTimestamp = parseFloat(a.timestamp);
    var bTimestamp = parseFloat(b.timestamp);
    if(aTimestamp > bTimestamp)
        return 1;

    if(bTimestamp > aTimestamp)
        return -1;

    return 0;
}

function orderByUpVoted(a,b){
    var aScore = parseInt(a.voteScore, 10);
    var bScore = parseInt(b.voteScore, 10);
    if(aScore > bScore)
        return -1;
    
    if(bScore > aScore)
        return 1;

    return 0;
}

function orderByDownVoted(a,b){
    var aScore = parseInt(a.voteScore, 10);
    var bScore = parseInt(b.voteScore, 10);
    if(aScore > bScore)
        return 1;
    
    if(bScore > aScore)
        return -1;

    return 0;
    
}
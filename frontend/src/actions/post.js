
import * as PostsApi from '../utils/PostsAPI';
import { POSTS_LOADED, POSTS_SEARCHED, POST_VOTED } from "../utils/ActionTypes";

export const get = (postId) => {
    return (dispatch) => {
        return PostsApi.get(postId)
            .then((objeto) => dispatch({ type: POSTS_LOADED, objetoPost: objeto }))
    }
}

export const search = () => {
    return (dispatch) => {
        return PostsApi.getAll()
            .then((posts) => dispatch({ type: POSTS_SEARCHED, posts: posts }))
    }
}

// export const votar = (post, type) => {
//     let newScore = 0
//     if(type === "upVote") {
//         newScore = post.voteScore + 1
//     } else {
//         newScore = post.voteScore - 1
//     }
//     PostsApi.vote(post, type);
//     return {type: POSTS_VOTED, postVoted: {...post, voteScore: newScore }}
// }

export const vote = (post, vote) => {
    return (dispatch) => {
        return PostsApi.vote(post, vote).then((post) => dispatch({ type: POST_VOTED, postVoted: post }))
    }
}

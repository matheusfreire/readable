import { api, headers} from './Api'


export const get = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())


export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)
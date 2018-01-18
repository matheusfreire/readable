import { api, headers} from './Api'


export const get = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())


export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getAllByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)
        
export const update = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {headers},
    body: JSON.stringify({ title: post.title, body: post.body})
  }).then(res => res.json())

export const remove = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {headers}
  }).then(res => res.json())

export const vote = (post, type) => 
    fetch(`${api}/posts/${post.id}`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: type})
    }).then(res => res.json())
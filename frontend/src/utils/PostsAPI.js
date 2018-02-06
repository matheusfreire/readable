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

export const create = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, timestamp: timestamp, title: title, body: body, author: author, category: category})
  }).then(res => res.json())
        
export const update = (id, title, body, category) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {headers},
    body: JSON.stringify({ title: title, body: body, category: category})
  }).then(res => res.json())

export const remove = (id) =>
  fetch(`${api}/posts/${id}`, {
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

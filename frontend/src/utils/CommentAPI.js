import { api, headers} from './Api'

export const get = (commentId) =>
    fetch(`${api}/comments/${commentId}`, { headers })
        .then(res => res.json()).then(data => data)


export const getAllByPost = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json()).then(data => data)

        
export const update = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {headers},
    body: JSON.stringify({comment})
  }).then(res => res.json())

export const remove = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: {...headers}
  }).then(res => res.json())

export const vote = (comment, type) => 
    fetch(`${api}/comments/${comment.id}`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: type})
    }).then(res => res.json())

export const create = (comment) =>
    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: comment.id, timestamp: comment.timestamp, body: comment.body,
         author: comment.author, parentId: comment.parentId})
    }).then(res => res.json())
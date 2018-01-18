import { api, headers} from './Api'

export const getAll = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data)
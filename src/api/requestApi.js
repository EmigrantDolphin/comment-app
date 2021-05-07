import { getToken } from '../utilities';

export const restMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

export const requestApi = (api, data = undefined, requestMethod = restMethod.GET) => {
    return fetch(`https://localhost:5001/api${api}`, {
        method: requestMethod,
        body: data && JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken() && `Bearer ${getToken()}`
        }
    });
}
export const appURL = 'http://buildingstore:81/'
export const instance = axios.create({
    baseURL: appURL + 'api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    },
});


export function getToken() {
    return localStorage.getItem('token') ?? '';
}
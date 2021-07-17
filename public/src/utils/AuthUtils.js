

const TOKEN = 'token';
const USER = 'user';

export const storeToken = (token) => {
    sessionStorage.setItem(TOKEN, token);
}

export const getToken = () => {
    return sessionStorage.getItem(TOKEN);
}

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN);
}

export const storeUser = (user) => {
    sessionStorage.setItem(USER, user);
}

export const getUser = () => {
    return sessionStorage.getItem(USER);
}

export const removeUser = () => {
    sessionStorage.removeItem(USER);
}
const tokenName = 'jwtToken';

export const checkIfAuthenticated = () => localStorage.getItem(tokenName) !== null;

export const saveToken = (token) => localStorage.setItem(tokenName, token);

export const removeToken = () => localStorage.removeItem(tokenName);

export const getToken = () => localStorage.getItem(tokenName);
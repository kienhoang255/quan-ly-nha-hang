import { LOGIN, RESIGTER } from './constants';

export const setResigter = (payload) => ({
    type: RESIGTER,
    payload,
});

export const setLogin = (payload) => ({
    type: LOGIN,
    payload,
});

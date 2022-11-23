import { EMPLOYEE, LOGIN, MESSAGE, RESIGTER } from './constants';

export const setResigter = (payload) => ({
    type: RESIGTER,
    payload,
});

export const setLogin = (payload) => ({
    type: LOGIN,
    payload,
});

export const setMessage = (payload) => ({
    type: MESSAGE,
    payload,
});

export const setEmployee = (payload) => ({
    type: EMPLOYEE,
    payload,
});

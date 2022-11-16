import axios from 'axios';
import { setToLocalStorage } from '~/utils/saveToBrowser';
import { URL } from './index';

export const login = (dispatch, data) => {
    axios.post(`${URL}users/login`, data).then((res) => {
        document.cookie = res.data.accessToken;
        const state = {
            role: res.data.role,
            job: res.data.job,
        };
        setToLocalStorage('user', state);
        return true;
    });
};

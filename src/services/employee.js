import axios from 'axios';
import { actions } from '~/store';
import { URL, headers } from '.';

export const getAllEmployee = (dispatch) => {
    axios.get(`${URL}employee/get-all-employee`, headers).then((res) => {
        dispatch(actions.setEmployee(res.data.foundResult));
    });
};

export const getEmployee = () => {};

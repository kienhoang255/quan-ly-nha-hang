import axios from 'axios';
import { actions } from '~/store';
import { URL, headers } from '.';

export const getAllEmployee = (dispatch) => {
    axios.get(`${URL}employee/`, headers).then((res) => {
        dispatch(actions.setEmployee(res.data));
    });
};

export const createEmployee = async (dispatch, data) => {
    return axios
        .post(`${URL}employee/`, data)
        .then((res) => {
            dispatch(actions.addEmployee(res.data.createEmployee));
            dispatch(actions.setMessage({ message: 'Thêm thành công' }));
            return res.data;
        })
        .catch((err) => {
            const statusCode = err.response.status;
            if (statusCode === 402) return { email: 'Email đã tồn tại' };
            else if (statusCode === 401) return { phone: 'Số điện thoại đã tồn tại' };
            else if (statusCode === 403) return { dm: 'Số điện thoại hoawjc email đã tồn tại' };
            else return { dm: 123 };
        });
};

export const updateEmployee = async (dispatch, data) => {
    return axios
        .put(`${URL}employee/`, data)
        .then((res) => {
            dispatch(actions.updateEmployee(res.data.updateEmployee));
            dispatch(actions.setMessage({ message: 'Cập nhật thành công' }));
            return res.data;
        })
        .catch((err) => {
            const statusCode = err.response.status;
            if (statusCode === 402) return { email: 'Email đã tồn tại' };
            else if (statusCode === 401) return { phone: 'Số điện thoại đã tồn tại' };
            else if (statusCode === 403) return { dm: 'Số điện thoại hoawjc email đã tồn tại' };
            else return { dm: 123 };
        });
};

export const deleteEmployee = (data) => {
    return axios
        .delete(`${URL}employee/${data}`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const getEmployee = () => {};

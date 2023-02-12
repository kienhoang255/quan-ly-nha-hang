import axios from 'axios';
import { actions } from '~/store';
import { getToLocalStorage, removeItemFromLS, setToLocalStorage } from '~/utils/saveToBrowser';
import { day, headers, hour, minute, month, URL, year } from './index';

export const login = (data, dispatch, info) => {
    axios
        .post(`${URL}user/login`, data)
        .then((res) => {
            if (res.data.avatar) setToLocalStorage('avatar', res.data.avatar);
            document.cookie = `token=${res.data.createToken}`;
            window.location.reload(true);
            dispatch(actions.setMessage({ type: 'success', message: 'Đăng nhâp thành công' }));
            const getInfo = getToLocalStorage('usedAccount');

            const addNewInfo = () => {
                let result = getInfo;
                if (getInfo) {
                    if (getInfo?.find((e) => e?.email === info?.email)) {
                        getInfo?.map((prev) => {
                            if (prev?.email === info.email) return info;
                            else return prev;
                        });
                    } else {
                        return [...getInfo, info];
                    }
                } else result = [info];
                return result;
            };

            setToLocalStorage('usedAccount', addNewInfo());
        })
        .catch((err) => {
            dispatch(actions.setMessage({ type: 'error', message: 'Tài khoản/mật khẩu không chính xác' }));
        });
};

export const resigter = (data) => {
    axios.post(`${URL}user/create`, data).then((res) => {});
};

export const test = () => {
    axios.get(`${URL}user/test`, headers).then((res) => {});
};

export const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    removeItemFromLS('avatar');
};

const staff = getToLocalStorage('user');
const dataCheckIn = {
    staff_id: staff?._id,
    hour: hour,
    minute: minute,
    day: day,
    month: month,
    year: year,
};
export const checkIn = () => {
    axios.post(`${URL}shift/create`, dataCheckIn, headers).then((res) => {});
};

export const getCheckIn = () => {
    axios.post(`${URL}shift/create`, dataCheckIn, headers).then((res) => {});
};

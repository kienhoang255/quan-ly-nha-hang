import moment from 'moment';

// export const URL = 'http://localhost:5000/';
export const URL = 'https://quan-ly-nha-hang-be-1.vercel.app/';
const token = document.cookie;
export const headers = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const date = Date.now();
export const day = moment(date).format('DD');
export const month = moment(date).format('MMM');
export const year = moment(date).format('YY');
export const hour = moment(date).format('HH');
export const minute = moment(date).format('mm');

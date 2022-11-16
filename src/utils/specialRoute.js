import { getToLocalStorage } from './saveToBrowser';

export const isRequiredStaff = () => {
    const isData = getToLocalStorage('role');
    if (isData === '0') {
        return false;
    }
    return true;
};

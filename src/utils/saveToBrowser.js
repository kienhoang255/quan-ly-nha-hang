export const setToLocalStorage = (option, data) => {
    localStorage.setItem(option, JSON.stringify(data));
};

export const getToLocalStorage = (option) => {
    const result = JSON.parse(localStorage.getItem(option));
    return result;
};

export const removeItemFromLS = (option) => {
    localStorage.removeItem(option);
};

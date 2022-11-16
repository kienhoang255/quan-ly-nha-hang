const isEmpty = (data, request) => {
    if (data[request] !== '') {
        return true;
    }
    return false;
};

export default isEmpty;

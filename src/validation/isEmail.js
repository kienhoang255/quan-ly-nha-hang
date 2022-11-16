const isEmail = (data) => {
    const patterEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (data.email.match(patterEmail)) {
        return true;
    }
    return false;
};

export default isEmail;

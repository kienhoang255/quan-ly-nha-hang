export const isPhoneNumber = (phone) => {
    let result;
    if (Number(phone)) {
        result = phone.match(/\d/g).length === 10 || phone.match(/\d/g).length === 11;
    } else result = false;
    return result;
};

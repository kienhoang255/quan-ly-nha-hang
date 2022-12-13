export const sortTypeDuplicate = (data) => {
    let getData = [];
    data.forEach((element) => {
        getData.push(element.type);
    });

    let result = [];
    const newData = [...new Set(getData)];

    newData.forEach((e) => {
        result.push({ type: e, active: false });
    });

    return result;
};

export const sortStageDuplicate = (data) => {
    let getData = [];
    data.forEach((element) => {
        getData.push(element.stage);
    });

    let result = [];
    const newData = [...new Set(getData)];

    newData.forEach((e) => {
        result.push({ stage: e, active: false });
    });

    return result;
};

export const formatVND = (number) =>
    new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(number);

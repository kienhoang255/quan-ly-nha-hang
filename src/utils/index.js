export const sortTypeDuplicate = (data) => {
    let getData = [];
    data.forEach((element) => {
        getData.push(element.type);
    });

    let result = [...new Set(getData)];

    return result;
};

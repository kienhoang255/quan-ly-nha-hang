export const imageToBase64 = (img, callback) => {
    if (img) {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = function () {
            callback(reader.result);
        };
    }
};

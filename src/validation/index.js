// const validate = (data) => {
//     // if (data[0].value === '')
//     //     return data.map((obj) => (obj.type === 'email' ? { ...obj, messageErr: 'e.target.value' } : obj));
//     // if (data[1].value === '')
//     //     return data.map((obj) => (obj.type === 'password' ? { ...obj, messageErr: 'e.target.value' } : obj));

import isEmail from './isEmail';
import isEmpty from './isEmpty';

//     return data;
// };

// validate.isEmpty = (data, request, options) => {
//     const findRequest = data.filter((obj) => obj.name === request);
//     if (findRequest[0].value === '')
//         return data.map((obj) =>
//             obj.name === request ? { ...obj, messageErr: `${options ? options : 'Cant empty'}` } : obj,
//         );
//     else return data.map((obj) => (obj.name === request ? { ...obj, messageErr: '' } : obj));
// };

// validate.isEmail = (data, options) => {
//     const patterEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     const findRequest = data.filter((obj) => obj.name === 'email');
//     if (findRequest[0].value.match(patterEmail)) return data;
//     else
//         return data.map((obj) =>
//             obj.name === 'email' ? { ...obj, messageErr: `${options ? options : 'This is not email'}` } : obj,
//         );
// };

// export default validate;

// // const validate = (data) => {
// //     const form = data;

// //     const patterEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// //     if (data[0].value === '') {
// //         // return data.map((obj) => (obj.type === 'email' ? { ...obj, messageErr: 'e.target.value' } : obj));
// //         if (data[1].value === '') {
// //             return data.map((obj) => (obj.type === 'password' ? { ...obj, messageErr: 'e.target.value' } : obj));
// //         }
// //     }

// //     console.log(form);

// //     return form;
// // };

// // export default validate;

function validate() {
    return isEmpty, isEmail;
}

export default validate;

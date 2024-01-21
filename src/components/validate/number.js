// check string without any character
export const validateNumber = (number) => {
    const regex = /^[0-9]*$/;
    return regex.test(number);
};

// check string is exist number
export const validateNumberExist = (number) => {
    const regex = /[0-9]/;
    return regex.test(number);
};

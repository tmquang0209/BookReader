// length min: 9
// length max: 20
// must contain at least 1 uppercase
// lowercase
// special character: !@#$%^&*()

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{9,20}$/;
    return regex.test(password);
};

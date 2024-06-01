export const validateFullName = (fullName) => {
    if (fullName.length >= 6) return { isValid: true, message: '' };
    return { isValid: false, message: 'More than 6 characters!' };
};

export const validateEmail = (email) => {
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    if (emailRegex.test(email)) return { isValid: true, message: '' };
    return { isValid: false, message: 'Wrong Email format! (abc@gmail.com)' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) return { isValid: true, message: '' };
    return { isValid: false, message: 'Does not match with Password!' };
};


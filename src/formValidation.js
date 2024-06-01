export const validateName = (name) => {
    if(name.length >= 6) return {isValid: true, message: ''}
    return {isValid: false, message: 'More than 6 characters !'}
}; 

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,11}$/
    if(phoneRegex.test(phone)) return {isValid: true, message: ''}
    return {isValid: false, message: '10 to 11 digits !'}
};

export const validateEmail = (email) => {
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
    if(emailRegex.test(email)) return {isValid: true, message: ''}
    return {isValid: false, message: 'Wrong Email format !'}
};

export const validateUserName = (userName) => {
    if (userName.length >= 6) {
        return { isValid: true, message: '' };
    }
    return { isValid: false, message: 'More than 6 characters' };
};
export const validateName = (name) => {
    if(name.length >= 6) return {isValid: true, message: ''}
    return {isValid: false, message: 'Name must be more than 6 characters !'}
}; 

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,11}$/
    if(phoneRegex.test(phone)) return {isValid: true, message: ''}
    return {isValid: false, message: 'Phone must be a number with 10 to 11 digits !'}
};

export const validateEmail = (email) => {
    if(email.endsWith('@gmail.com')) return {isValid: true, message: ''}
    return {isValid: false, message: 'Wrong Email format !'}
};

export const validateUserName = (userName) => {
    if (userName.length >= 6) {
        return { isValid: true, message: '' };
    }
    return { isValid: false, message: 'UserName must be more than 6 characters' };
};
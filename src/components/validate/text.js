// limit length
export const validateLimit = (text, limit) => {
    return text.trim().length <= limit;
};

// check string without any special character, accept space and 
export const validateSpecialCharacter = (text) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(text);
};

// check html tag in string
export const validateHtmlTag = (text) => {
    const regex = /<("[^"]*"|'[^']*'|[^'">])*>/;
    return regex.test(text);
};

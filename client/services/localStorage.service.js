export const getValueFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const setValueToLocalStorage = ({key, value}) => {
    localStorage.setItem(key, value);
}

export const removeKeyFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}
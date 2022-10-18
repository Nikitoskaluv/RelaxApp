export const patternName = '[a-zA-Zа-яА-ЯёЁ0-9]{3,}';
export const patternEmail = '[a-zA-Z0-9._-]+@[a-z0-9-_]+[\.]+[a-zA-Z]{2,4}$';
export const patternPassword = '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}';
// export const patternPassword = '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{4,}/g';

export const validation = (elem, elem_pattern)=>{
    let str = elem.value;
    let regExp = new RegExp(elem_pattern);
    return regExp.test(str);   
}

import { Cookies, getCookie } from "react-cookie";




export const setCookie = (name, value, option) => {
    return Cookies.set(name, value, option);
}
export const getCookie = (name) => {
    return cookies.get(name);
}
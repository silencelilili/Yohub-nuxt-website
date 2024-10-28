import Cookies from 'js-cookie'

export const setCookie = Cookies.set.bind(Cookies)
export const removeCookie = Cookies.remove.bind(Cookies)

export const getCookie = Cookies.get.bind(Cookies)

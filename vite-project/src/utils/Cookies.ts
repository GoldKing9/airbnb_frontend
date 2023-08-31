import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any): void => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: any): void => {
  return cookies.remove(name, { ...option });
};
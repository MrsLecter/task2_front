export const EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;
export const PASSWORD_REGEXP = /.{8,}/;

const FIREBASE_KEY = "AIzaSyA1zoqNWfPEpkZ2aip6mUd8tM1d0KZGYBo";
export const SIGNUP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
  FIREBASE_KEY;
export const LOGIN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  FIREBASE_KEY;

export const BASIC_ROOT = "http://142.93.134.108:1111";
export const BASIC_SIGNUP = `${BASIC_ROOT}/sign_up`;
export const BASIC_LOGIN = `${BASIC_ROOT}/login`;
export const BASIC_PAGE = `${BASIC_ROOT}/me`;
export const BASIC_REFRESH = `${BASIC_ROOT}/refresh`;

export const REQUEST_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Content-Security-Policy": "default-src self",
};

export const ONE_MINUTE_IN_MS = 60000;

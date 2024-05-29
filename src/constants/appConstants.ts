import {config} from "dotenv";

config()
export const PORT = process.env.PPORT || 4000
export const ROUTES = {
    ROOT:'/',
    API: '/api',
    USERS: '/api/users'
}

export const URL_TYPES = {
    INVALID: 'invalidUrl',
    USER_URL: 'userUrl',
    USER_ID_URL: 'userIdUrl'
}

export const RESPONSES = {
    USER_NOT_EXIST: {status: 404, data: 'User doesn\'t exist'},
    INVALID_UID: {status: 400, data: 'Invalid UID'},
    INVALID_BODY_FIELD: {status: 400, data: 'There are no required fields in the body'}
}
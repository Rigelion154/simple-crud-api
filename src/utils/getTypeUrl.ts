import {ROUTES, URL_TYPES} from "../constants/appConstants";
import {IUser} from "../types/types";

export const getTypeUrl = (url: string) => {
    const usersUrlRegex = new RegExp(`^${ROUTES.USERS}/?$`);
    const userIdUrlRegex = new RegExp(`^${ROUTES.USERS}/[^/]+/?$`);

    if (usersUrlRegex.test(url)) {
        return URL_TYPES.USER_URL
    } else  if (userIdUrlRegex.test(url)) {
        return URL_TYPES.USER_ID_URL
    } else  {
        return URL_TYPES.INVALID
    }
}


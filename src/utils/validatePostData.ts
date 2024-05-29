import {IUser} from "../types/types";

export const validatePostData = (data: string) => {
    const postData = JSON.parse(data) as IUser
    return !postData.username || !postData.age || !postData.hobbies ? false : true
}
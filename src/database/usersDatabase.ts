import {IUsers} from "../types/types";
import {v4 as uuidv4, validate} from 'uuid';
import {validatePostData} from "../utils/validatePostData";
import {RESPONSES} from "../constants/appConstants";

class Users {
    private users: IUsers = {};
    getUserById(uid: string) {
        const currentUser = this.users[uid]

        if (!validate(uid)) {
            return RESPONSES.INVALID_UID
        }

        if (currentUser) {
            return {status: 200, data: currentUser}
        } else {
            return RESPONSES.USER_NOT_EXIST
        }
    }

    getUsers() {
        return {status: 200, data: this.users};
    }

    createUser(data: string) {
        const isDataValid = validatePostData(data)
        if (isDataValid) {
            const uid = uuidv4()
            const user = {
                id: uid,
                ...JSON.parse(data)
            }
            this.users[uid] = user;
            return {status: 201, data: user}
        } else return RESPONSES.INVALID_BODY_FIELD

    }

    changeUser(data: string, uid: string) {
        const isDataValid = validatePostData(data)
        const currentUser = this.users[uid]

        if (!validate(uid)) {
            return RESPONSES.INVALID_UID
        }

        if (isDataValid) {
            if (currentUser) {
                this.users[uid] = {id: currentUser.id, ...JSON.parse(data)}
                return {status: 200, data: this.users[uid]}
            } else {
                return RESPONSES.USER_NOT_EXIST
            }
        } else return RESPONSES.INVALID_BODY_FIELD

    }

    deleteUser(uid: string) {
        const currentUser = this.users[uid]

        if (!validate(uid)) {
            return RESPONSES.INVALID_UID
        }

        if (currentUser) {
            delete this.users[uid]
            return {status: 204, data: `User was deleted`}
        } else {
            return RESPONSES.USER_NOT_EXIST
        }
    }
}

export default new Users();
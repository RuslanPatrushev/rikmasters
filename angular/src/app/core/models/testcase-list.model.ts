import {User, UserData} from "./user.model";

export interface TestcaseList {
    page: {
        total: number,
        current: number,
        size: number
    },
    users: User[],
    data: UserData[]
}
import {StatusEnum} from "../enums/status.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    create_at: number;
    update_at: number;
    is_admin?: boolean;
    is_ecp?: boolean;
    status?: StatusEnum;
}

export interface UserData {
    user_id: number;
    is_admin: boolean;
    is_ecp: boolean;
    status: StatusEnum;
}

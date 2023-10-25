export interface UserForm {
    name: string;
    email: string;
    phone: number;
    create_at: number;
    update_at: number;
    is_admin?: boolean;
    is_ecp?: boolean;
    status?: string;
}

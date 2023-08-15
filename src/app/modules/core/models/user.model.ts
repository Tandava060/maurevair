export interface User {
    accessToken: string;
    user: UserDetails
}

export interface UserDetails {
    email: string;
    id: number;
}

export interface UserLogin {
    email: string;
    password: string;
}
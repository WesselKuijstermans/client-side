import { UserEntity } from "./user";

export class AuthEntity {
    email: string;
    password: string;
    salt: string;
    token?: string;

    constructor(email: string, password: string, salt: string) {
        this.email = email;
        this.password = password;
        this.salt = salt;
    }
}

export class LoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class RegisterRequest {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class AuthResponse {
    token: string;
    user: UserEntity;

    constructor(token: string, user: UserEntity) {
        this.token = token;
        this.user = user;
    }
}
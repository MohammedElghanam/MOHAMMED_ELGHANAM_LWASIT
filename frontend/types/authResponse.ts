export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface RegisterSuccessResponse {
    message: string;
    user: User;
}

export interface LoginSuccessResponse {
    token: string;
}

export interface ErrorResponse {
    message: string;
}
  
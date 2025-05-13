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
    message: string;
}

export interface ErrorResponse {
    message: string;
}
  
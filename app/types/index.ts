export type TSignUpUser = {
    password: string;
    user: {
        name: string;
        email: string;
    }
}

export type TLoginUser = {
    email: string;
    password: string;
}
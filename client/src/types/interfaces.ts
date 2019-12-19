export interface RegisterModel {
    email: string | undefined,
    password: string | undefined,
}

export interface SignInFormProps {
    token: string;
    onSignInSuccess: Function;
    onSignInError: Function;
    onGetUserInformation: Function;
}

export interface Props {
}

export interface State {
  email: string | undefined,
  password: string | undefined,
  passwordAgain: string | undefined,
  role?: string,
}

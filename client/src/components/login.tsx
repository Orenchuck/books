import React, { Fragment } from 'react';
import { RegisterModel } from '../types/interfaces';
import { Route, Redirect } from 'react-router-dom';
import { Books } from './books';

export interface Props {
  }

interface State {
    email: string | undefined,
    password: string | undefined,
    successLogin: boolean | undefined,
}

export class Login extends React.Component<Props, State> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            successLogin: undefined,
        }

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleChange = (): any => {
        this.setState({
            email: this.emailRef.current?.value,
            password: this.passwordRef.current?.value,
        })
    }

    submitLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        const { email, password } = this.state;
        const registerModel: RegisterModel = {
            email,
            password,
        }

        const requestJsonData = JSON.stringify(registerModel);

        const loginRoute = `https://localhost:443/auth`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: requestJsonData,
        })
            .then(response => response.json())
            .then(({ accessToken }) => {
                if (accessToken) {
                    this.setState({
                        successLogin: true,
                    })
                    // onSignInSuccess(email, token);
                }
                this.setState({
                    successLogin: false,
                })
                // if (!token) {
                //     onSignInError("Invalid credentials.");
                // }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    successLogin: false,
                })
            })
            // .then(() => {
                this.setState({
                    email: '',
                    password: '',
                });
            // });
    }

    render() {
        const { email, password, successLogin } = this.state;
        if (successLogin === undefined) {
            return (
           <form>
                <label>
                    Enter your email
                    <input ref={this.emailRef} type='text' value={email} onChange={this.handleChange} />
                </label>
                <label>
                    Enter your password
                    <input ref={this.passwordRef} type='text' value={password} onChange={this.handleChange} />
                </label>
                <button onClick={this.submitLogin}>Login</button>
            </form>   
        )
        }
        if (successLogin === false) {
            return <h3>Wrong email or password</h3>
        }
        return (
            <Fragment>
              <Route path="/" exact component={Books} />
              <Redirect to="/"  />
            </Fragment>
          )
    }
}

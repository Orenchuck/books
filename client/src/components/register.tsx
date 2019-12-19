import React, { Fragment } from 'react';
import { RegisterModel, State, Props } from '../types/interfaces';
import { Route, Redirect } from 'react-router-dom';
import { Books } from './books';

export class Register extends React.Component<Props, State> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private passwordAgainRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: '',
            role: '',
        }

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordAgainRef = React.createRef();
    }


    handleChange = (): void => {
        this.setState({
            email: this.emailRef.current?.value,
            password: this.passwordRef.current?.value,
            passwordAgain: this.passwordAgainRef.current?.value,
        });
    }

    redirectToHome = () => {
        console.log('redirectToHome');
        
        return (
                <Route path="/" component={Books} />
        )
    }

    clearState = () => {
        this.setState({
            email: '',
            password: '',
            passwordAgain: '',
            role: '',
        });
    }

    submitRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        const { email, password } = this.state;
        const registerModel: RegisterModel = {
            email,
            password,
        }

        const requestJsonData = JSON.stringify(registerModel);

        const loginRoute = `https://localhost:443/auth/register`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: requestJsonData,
        })
            .then(response => response.json())
            .then(({roles}) => {
                this.setState ({ role: roles });                
                // if (token) {
                //     onSignInSuccess(email, token);
                // }
                // if (!token) {
                //     onSignInError("Invalid credentials.");
                // }
            })
            .catch(error => {
                console.log(error);

            })
                this.setState({
                    email: '',
                    password: '',
                    passwordAgain: '',
            });
    }

    render() {
       if (this.state.role === '') {
           return (
            <form>
                <label>
                    Enter your email
                    <input ref={this.emailRef} type='text' value={this.state.email} onChange={this.handleChange} />
                </label>
                <label>
                    Enter your password
                    <input ref={this.passwordRef} type='text' value={this.state.password} onChange={this.handleChange} />
                </label>
                <label>
                    Confirm your password
                    <input ref={this.passwordAgainRef} type='text' value={this.state.passwordAgain} onChange={this.handleChange} />
                </label>
                <button onClick={this.submitRegister}>Register</button>
            </form>
        )
       }
       else {
        return (
            <Fragment>
              <Route path="/" exact component={Books} />
              <Redirect to="/"  />
            </Fragment>
          )
       }    
    }
}

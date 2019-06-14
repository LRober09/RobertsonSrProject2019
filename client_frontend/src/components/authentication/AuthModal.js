import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import store from 'store';

import {setUserId} from "../../telemetry/context/TelemetryGlobal";

import {loginUser, registerUser} from '../../requests/user';

import './authModal.scss';
import TelemButton from "../common/TelemButton";
import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";
import TelemGeneric from "../common/TelemGeneric";


class AuthModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            loginPassword: "",

            registerEmail: "",
            registerPhone: "",
            registerPassword: "",
            registerConfirm: "",

            isSubmitting: false,

            registerError: null,
            loginError: null,
            passwordMatchErr: false,
        };
    }

    onFormFieldChanged = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            passwordMatchErr: false,
            registerError: false
        });
    };

    loginFetchUser = (loginObject) => {
        loginUser(loginObject, (result) => {
            store.set('token', result.token);
            this.props.setUser(result);
            setUserId(result._id);
            this.props.onClose();
        }, (err) => {
            this.setState({loginError: err});
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        });
    };

    onLogin = (e) => {
        e.preventDefault();
        const {loginEmail, loginPassword} = this.state;

        const loginObject = {
            email: loginEmail,
            password: loginPassword,
        };

        this.loginFetchUser(loginObject);
    };

    onRegister = (e) => {
        e.preventDefault();
        const {
            registerEmail,
            registerPhone,
            registerPassword,
            registerConfirm
        } = this.state;

        if (registerPassword !== registerConfirm) {
            this.setState({passwordMatchErr: true});
        } else {

            const newUser = {
                email: registerEmail,
                password: registerPassword,
                phone: registerPhone,
            };

            registerUser(newUser, (result) => {
                this.loginFetchUser({
                    email: registerEmail,
                    password: registerPassword,
                });
            }, (err) => {
                this.setState({registerError: err});
            }, () => {
                this.setState({isSubmitting: true});
            }, () => {
                this.setState({isSubmitting: false});
            });
        }
    };

    render() {
        const {isOpen, onClose} = this.props;
        const {registerError, loginError, passwordMatchErr, isSubmitting} = this.state;

        const loginEmailClass = classNames('form-control', {
            'is-invalid': loginError,
        });

        const registerEmailClass = classNames('form-control', {
            'is-invalid': registerError,
        });

        const registerConfirmClass = classNames('form-control', {
            'is-invalid': passwordMatchErr,
        });


        return isOpen ? (
                <div className="authModal-background">
                    <div className="card authModal-container">
                        <div className="card-header">
                            Login/Register
                            <TelemGeneric handler={onClose} {...BUTTON_TELEMETRY.CLOSE_AUTH_BUTTON}>
                                    <span className='float-right' style={{cursor: "pointer"}}>
                                        <span className="oi oi-circle-x"/>
                                    </span>
                            </TelemGeneric>
                        </div>
                        <div className="card-body authModal-body">
                            <form onSubmit={this.onLogin}>
                                <div className="form-group">
                                    <label htmlFor="loginEmail">Email</label>
                                    <input type="email" className={loginEmailClass} id="loginEmail"
                                           placeholder="Enter email" onChange={this.onFormFieldChanged} required/>
                                    {
                                        this.state.loginError && (
                                            <div className="invalid-feedback">
                                                <span>{this.state.loginError}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loginPassword">Password</label>
                                    <input type="password" className="form-control" id="loginPassword"
                                           placeholder="Password" onChange={this.onFormFieldChanged} required/>

                                </div>
                                <TelemButton type="submit"
                                             className="btn btn-primary"
                                             disabled={isSubmitting}
                                             {...BUTTON_TELEMETRY.LOGIN_BUTTON}>
                                    Log in
                                </TelemButton>
                            </form>
                            <hr/>
                            <form onSubmit={this.onRegister}>
                                <div className="form-group">
                                    <label htmlFor="registerEmail">Email</label>
                                    <input type="email" className={registerEmailClass} id="registerEmail"
                                           placeholder="Enter email" onChange={this.onFormFieldChanged} required/>
                                    {
                                        this.state.registerError && (
                                            <div className="invalid-feedback">
                                                <span>{this.state.registerError}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registerPhone">Phone</label>
                                    <input type="phone" className="form-control" id="registerPhone"
                                           placeholder="###-###-####" onChange={this.onFormFieldChanged} required/>
                                    <small className="form-text text-muted">This doesn't have to be a real phone number
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registerPassword">Password</label>
                                    <input type="password" className="form-control" id="registerPassword"
                                           placeholder="Password" minLength={1} onChange={this.onFormFieldChanged}
                                           required/>
                                    <small className="form-text text-muted">Please don't use a personal password</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registerConfirm">Confirm Password</label>
                                    <input type="password" className={registerConfirmClass} id="registerConfirm"
                                           placeholder="Password" minLength={1} onChange={this.onFormFieldChanged}
                                           required/>
                                    {
                                        this.state.passwordMatchErr && (
                                            <div className="invalid-feedback">
                                                Passwords must match
                                            </div>
                                        )
                                    }
                                </div>
                                <TelemButton type="submit" className="btn btn-primary"
                                             disabled={isSubmitting} {...BUTTON_TELEMETRY.REGISTER_BUTTON}>Register
                                </TelemButton>
                            </form>
                        </div>
                    </div>
                </div>
            ) :
            <div/>
    }
}

AuthModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

AuthModal.defaultProps = {
    isOpen: true
};


export default AuthModal;
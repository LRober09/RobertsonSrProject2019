import React, {Component} from 'react';
import store from 'store';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';

import {AppContext} from "../Context";
import {getUser, changeUserPassword, changeUserAddress} from "../../requests/user";

import Container from '../layout/Container';
import Row from '../layout/Row';
import Col from '../layout/Col';
import Loader from "../common/Loader";
import TelemButton from "../common/TelemButton";
import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        const token = store.get('token');
        if (token) {
            getUser(token, (result) => {
                this.context.setUser(result);
            }, (err) => {
                store.remove('token');
                console.warn('User token was invalid or expired - could not authenticate automatically');
                this.props.history.push('/');
            }, () => {
                this.setState({isLoading: true});
            }, () => {
                this.setState({isLoading: false});
            });
        }
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="display-4">Account Settings</h2>
                    </Col>
                </Row>
                {
                    this.state.isLoading ? (
                        <Col w={12}>
                            <Loader/>
                        </Col>
                    ) : <SettingsContent/>
                }
            </Container>
        )
    }
}

class SettingsContent extends Component {
    constructor(props, context) {
        super(props, context);

        const {street, city, zip, state} = context.user.profile.address;

        this.state = {
            isSubmitting: false,
            passwordMatchErr: false,
            passwordChangeSuccess: false,
            addressChangeSuccess: false,

            changePassword: '',
            changePasswordConfirm: '',

            changeAddressStreet: street,
            changeAddressCity: city,
            changeAddressState: state,
            changeAddressZip: zip,
        }
    }


    onFormFieldChanged = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            passwordMatchErr: false,
            passwordChangeSuccess: false,
            registerError: false
        });
    };

    handlePasswordChange = (e) => {
        e.preventDefault();
        const {
            changePassword,
            changePasswordConfirm,
        } = this.state;

        if (changePassword !== changePasswordConfirm) {
            this.setState({passwordMatchErr: true});
        } else {
            const token = store.get('token');
            changeUserPassword(token, changePassword, () => {
                this.setState({changePassword: '', changePasswordConfirm: '', passwordChangeSuccess: true});
            }, (err) => {
                console.error('Error: ', err);
            }, () => {
                this.setState({isSubmitting: true});
            }, () => {
                this.setState({isSubmitting: false});
            })
        }
    };

    handleAddressChange = (e) => {
        e.preventDefault();
        const {
            changeAddressStreet,
            changeAddressState,
            changeAddressCity,
            changeAddressZip,
        } = this.state;

        const address = {
            street: changeAddressStreet,
            state: changeAddressState,
            city: changeAddressCity,
            zip: changeAddressZip,
        };

        const token = store.get('token');

        changeUserAddress(token, address, () => {
            this.setState({addressChangeSuccess: true});
        }, (err) => {
            console.error('Error: ', err);
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        })
    };

    render() {
        const {
            isSubmitting,
            passwordMatchErr,
            passwordChangeSuccess,
            addressChangeSuccess
        } = this.state;

        const changePasswordConfirmClass = classNames('form-control', {
            'is-invalid': passwordMatchErr,
        });

        return (
            <React.Fragment>
                <Row>
                    <Col w={12}>
                        <div className="card">
                            <div className="card-header">
                                Change Password
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handlePasswordChange}>
                                    <div className="form-group">
                                        <label htmlFor="changePassword">Password</label>
                                        <input type="password" value={this.state.changePassword}
                                               className="form-control" id="changePassword"
                                               placeholder="Enter password" onChange={this.onFormFieldChanged}
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="changePasswordConfirm">Confirm Password</label>
                                        <input type="password" value={this.state.changePasswordConfirm}
                                               className={changePasswordConfirmClass}
                                               id="changePasswordConfirm"
                                               placeholder="Confirm password" onChange={this.onFormFieldChanged}
                                               required/>
                                        {
                                            passwordMatchErr && (
                                                <div className="invalid-feedback">
                                                    Passwords must match
                                                </div>
                                            )
                                        }
                                    </div>
                                    <TelemButton type="submit"
                                                 className="btn btn-primary"
                                                 disabled={isSubmitting}
                                                 {...BUTTON_TELEMETRY.CHANGE_PASS_BUTTON}>
                                        Change Password
                                    </TelemButton>
                                    {
                                        passwordChangeSuccess && (
                                            <React.Fragment>
                                                <br/>
                                                <small className="text-success">
                                                    Password changed successfully!
                                                </small>
                                            </React.Fragment>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col w={12}>
                        <div className="card">
                            <div className="card-header">
                                Change address
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleAddressChange}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="changeAddressStreet">Street</label>
                                                <input type="text" value={this.state.changeAddressStreetd}
                                                       className="form-control" id="changeAddressStreet"
                                                       placeholder="Street" onChange={this.onFormFieldChanged}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="changeAddressState">State</label>
                                                <input type="text" value={this.state.changeAddressState}
                                                       className="form-control"
                                                       id="changeAddressState"
                                                       placeholder="State" onChange={this.onFormFieldChanged}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="changeAddressCity">City</label>
                                                <input type="text" value={this.state.changeAddressCity}
                                                       className="form-control"
                                                       id="changeAddressCity"
                                                       placeholder="City" onChange={this.onFormFieldChanged}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="changeAddressZip">Zip</label>
                                                <input type="text" value={this.state.changeAddressZip}
                                                       className="form-control"
                                                       id="changeAddressZip"
                                                       placeholder="Zip" onChange={this.onFormFieldChanged}/>
                                            </div>
                                        </div>
                                    </div>
                                    <TelemButton type="submit"
                                                 className="btn btn-primary"
                                                 disabled={isSubmitting}
                                                 {...BUTTON_TELEMETRY.CHANGE_ADDRESS_BUTTON}>
                                        Change Address
                                    </TelemButton>
                                    {
                                        addressChangeSuccess && (
                                            <React.Fragment>
                                                <br/>
                                                <small className="text-success">
                                                    Address changed successfully!
                                                </small>
                                            </React.Fragment>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

Settings.contextType = AppContext;
SettingsContent.contextType = AppContext;

export default withRouter(Settings);
import React, {Component} from 'react';
import store from 'store';
import {withRouter} from 'react-router-dom';

import {getUser, logoutUser} from '../../requests/user';

import PropTypes from 'prop-types';
import {AppContext} from '../Context';

import "./navbar.scss";
import TelemNavLink from "../common/TelemNavLink";
import TelemGeneric from "../common/TelemGeneric";
import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetchingUser: false
        };
    }

    componentWillMount() {
        const token = store.get('token');
        if (token && !this.context.user.email) {
            getUser(token, (result) => {
                    this.context.setUser(result);
                }, () => {
                    store.remove('token');
                    console.warn('User token was invalid or expired - could not authenticate automatically');
                }, () => {
                    this.setState({isFetchingUser: true});
                },
                () => {
                    this.setState({isFetchingUser: false});
                });
        }
    }

    handleNav = (path) => {
        this.props.history.push(path);
    };

    logoutUser = () => {
        const token = store.get('token');
        logoutUser(token, () => {
            store.remove('token');
            this.context.setUser({});
        }, (err) => {
            console.error(err);
        }, () => {
            this.setState({isFetchingUser: true});
        }, () => {
            this.setState({isFetchingUser: false});
        })
    };

    render() {
        const {toggleAuthModal, location} = this.props;
        const {user} = this.context;
        const path = location.pathname;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
                <a className="navbar-brand text-primary" href="/">Test Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <TelemNavLink active={path === '/'}
                                      handler={() => this.handleNav('/')}
                                      {...BUTTON_TELEMETRY.NAV_HOME_LINK}>
                            Home
                        </TelemNavLink>

                        <TelemNavLink active={path === '/products'}
                                      handler={() => this.handleNav('/products')}
                                      {...BUTTON_TELEMETRY.NAV_PRODUCTS_LINK}>
                            Products
                        </TelemNavLink>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {
                            this.state.isFetchingUser ? (
                                <li className="nav-item">
                                    <span className="nav-link disabled">Loading...</span>
                                </li>
                            ) : (
                                <React.Fragment>
                                    {
                                        user.email ? (
                                            <React.Fragment>
                                                <li className="nav-item">
                                                    <span className="nav-link">
                                                        <span className="oi oi-cart" style={{marginRight: "5px"}}/>
                                                        Cart ({user.profile ? user.profile.cart.length : 0})
                                                    </span>
                                                </li>
                                                <TelemNavLink active={path === '/settings'}
                                                              handler={() => this.handleNav('/settings')}
                                                              {...BUTTON_TELEMETRY.NAV_SETTINGS_LINK}>
                                                    Settings
                                                </TelemNavLink>
                                                <li className="nav-item">
                                                    <span className="nav-link"
                                                          onClick={this.logoutUser}>{user.email}</span>
                                                </li>
                                            </React.Fragment>

                                        ) : (
                                            <li className="nav-item">
                                                <TelemGeneric handler={toggleAuthModal}
                                                              {...BUTTON_TELEMETRY.DISPLAY_AUTH_BUTTON}>
                                                    <span className="nav-link">Login/Register</span>
                                                </TelemGeneric>
                                            </li>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    toggleAuthModal: PropTypes.func,
};

Navbar.contextType = AppContext;

export default withRouter(Navbar);
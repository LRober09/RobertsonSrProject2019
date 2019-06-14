import React from 'react';
import PropTypes from 'prop-types';

const NavLink = (props) => (
    <li className={"nav-item" + (props.active ? " active" : "")} onClick={props.handleNav}>
        <span className="nav-link">{props.children}</span>
    </li>
);

NavLink.propTypes = {
    active: PropTypes.bool,
    handleNav: PropTypes.func
};

export default NavLink;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import {Link} from 'react-router-dom';


class Button extends Component {
    render() {
        const {block, children, color, disabled, outline, path, size, type, ...props} = this.props;

        const colorClass = "btn-" + (outline ? "outline-" : "") + color;

        const classes = classNames('btn', colorClass, {
            'btn-lg': size === 'lg',
            'btn-sm': size === 'sm',
            'btn-block': block,
            'disabled': type === 'link' && disabled
        });

        if (type === 'button') {
            return (
                <button
                    className={classes}
                    type={type}
                    disabled={disabled}
                    {...props}>
                    {children}
                </button>
            )
        } else if (['submit', 'reset'].indexOf(type) !== -1) {
            return (
                <input
                    className={classes}
                    type={type}
                    disabled={disabled}
                    value={children}
                    {...props}/>
            )
        } else if (type === 'link') {
            return (
                <Link
                    className={classes}
                    to={path}
                    {...props}>
                    {children}
                </Link>
            )
        }
    }
}

Button.propTypes = {
    block: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link',
    ]),
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
    path: (props, propName) => {
        if (props['type'] === 'link' && (props[propName] === undefined || typeof (props[propName]) !== 'string')) {
            return new Error('If Button type is "link", a "path" prop must be provided');
        }
    },
    size: PropTypes.oneOf([
        'lg',
        'md',
        'sm',
    ]),
    type: PropTypes.oneOf([
        'submit',
        'button',
        'reset',
        'link',
    ])
};

Button.defaultProps = {
    block: false,
    children: "",
    color: 'primary',
    disabled: false,
    outline: false,
    size: 'md',
    type: 'button',
};


export default Button;
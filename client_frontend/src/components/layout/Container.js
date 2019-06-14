import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Container extends Component {
    render() {
        const {children, fluid, ...props} = this.props;

        const classes = classNames({
            'container': !fluid,
            'container-fluid': fluid
        });

        return (
            <div className={classes} {...props}>
                {children}
            </div>
        )
    }
}

Container.propTypes = {
    fluid: PropTypes.bool,
};

Container.defaultProps = {
    fluid: false,
};

export default Container;
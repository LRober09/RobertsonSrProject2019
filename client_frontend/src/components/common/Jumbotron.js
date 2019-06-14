import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Jumbotron extends Component {
    render() {
        const {children, fluid, ...props} = this.props;

        const parentClass = classNames('jumbotron', {
            'jumbotron-fluid': fluid,
        });

        return (
            <div className={parentClass} {...props}>
                {
                    fluid ? (
                        <div className="container-fluid">
                            {children}
                        </div>
                    ) : children
                }
            </div>
        )
    }
}

Jumbotron.propTypes = {
    fluid: PropTypes.bool,
};

Jumbotron.defaultProps = {
    fluid: false,
};

export default Jumbotron;
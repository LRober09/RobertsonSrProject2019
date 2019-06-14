import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Col extends Component {
    render() {
        const {children, w, sm, ...props} = this.props;
        // const {w, sm, md, lg, xl} = this.props;
        const classes = w === undefined ? "col" : "col-" + w;

        return (
            <div className={classes} {...props}>
                {children}
            </div>
        )
    }
}

Col.propTypes = {
    children: PropTypes.any,
    w: PropTypes.number,
    sm: PropTypes.number,
};


export default Col;
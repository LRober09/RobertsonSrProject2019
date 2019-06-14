import React from 'react';
import PropTypes from 'prop-types';
import {withTelemetry} from '../../telemetry/components/withTelemetry';
import Button from '../common/Button';

const TelemButton = ({handler, onInteraction, controlIdSuffix, children, ...otherProps}) => {
    const onClick = () => {
        onInteraction(handler, controlIdSuffix);
    };

    return (
        <Button onClick={onClick} {...otherProps}>{children}</Button>
    )
};

TelemButton.propTypes = {
    controlIdSuffix: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};

export default withTelemetry(TelemButton);



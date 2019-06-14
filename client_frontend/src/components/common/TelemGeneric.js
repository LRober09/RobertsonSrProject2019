import React from 'react';
import PropTypes from 'prop-types';
import {withTelemetry} from '../../telemetry/components/withTelemetry';

const TelemGeneric = ({handler, onInteraction, children, ...otherProps}) => {
    const onClick = () => {
        onInteraction(handler);
    };

    return React.cloneElement(children, {onClick: onClick, ...otherProps});
};

TelemGeneric.propTypes = {
    children: PropTypes.node.isRequired
};

export default withTelemetry(TelemGeneric);





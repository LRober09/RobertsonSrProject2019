import React from 'react';
import {withTelemetry} from '../../telemetry/components/withTelemetry';
import NavLink from '../navbar/NavLink';

const TelemNavLink = ({handler, onInteraction, children, ...otherProps}) => {
    const onClick = () => {
        onInteraction(handler);
    };

    return (
        <NavLink {...otherProps} handleNav={onClick}>{children}</NavLink>
    )
};

export default withTelemetry(TelemNavLink);
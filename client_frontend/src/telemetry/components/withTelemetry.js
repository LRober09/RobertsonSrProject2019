import React from 'react';
import PropTypes from 'prop-types';
import {TelemetryContextConsumer} from "../context/TelemetryContext";

const withTelemetry = (WrappedComponent) => {
    const _withTelemetry = ({controlId, controlType, actionType, intent, ...otherProps}) => {
        return (
            <TelemetryContextConsumer>
                {state => <WrappedComponent
                    onInteraction={
                        (handler, controlIdSuffix) => state.onInteraction(
                            'withTelemetry',
                            handler,
                            controlId + (controlIdSuffix ? '_' + controlIdSuffix : ''),
                            controlType,
                            actionType,

                            intent
                        )
                    } {...otherProps} />}
            </TelemetryContextConsumer>
        )
    };

    _withTelemetry.propTypes = {
        controlId: PropTypes.string.isRequired,
        controlType: PropTypes.oneOf([
            'navigation',
            'mutation',
        ]).isRequired,
        actionType: PropTypes.oneOf([
            'click',
            'onBlur',
        ]).isRequired,
        intent: PropTypes.shape({
            completion: PropTypes.bool,
            label: PropTypes.string,
        })
    };

    _withTelemetry.defaultProps = {
        intent: {
            completion: false,
            label: null,
        }
    };

    return _withTelemetry;
};

export {withTelemetry};



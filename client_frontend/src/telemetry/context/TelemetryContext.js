import React from 'react';

//import {getGlobalState} from "./TelemetryGlobal";
import {onInteraction} from "../lib";

const TelemetryContext = React.createContext();
const TelemetryContextConsumer = TelemetryContext.Consumer;

class TelemetryProvider extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            onInteraction: (caller, handler, controlId, controlType, actionType, intent) => onInteraction(this, caller, handler, controlId, controlType, actionType, intent),
        };
    }

    render() {
        const {children} = this.props;

        return (
            <TelemetryContext.Provider value={this.state}>
                {children}
            </TelemetryContext.Provider>
        )
    }
}


export {TelemetryContext, TelemetryContextConsumer, TelemetryProvider};
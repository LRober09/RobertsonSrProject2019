import React, {Component} from 'react';
import {TelemetryProvider} from "../telemetry/context/TelemetryContext";
import {initTelemetryService} from "../telemetry/context/TelemetryGlobal";
import {AppProvider} from "./Context";
import Router from './router/Router';


class App extends Component {
    componentWillMount() {
        const options = {
            telemetryApiUri: 'http://localhost:8080'
        };
        initTelemetryService(options);
    }

    render() {
        return (
            <TelemetryProvider>
                <AppProvider>
                    <Router/>
                </AppProvider>
            </TelemetryProvider>
        );
    }
}

export default App;

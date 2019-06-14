import {generateNewInteraction, updateSession, closeSession} from "./context/TelemetryGlobal";

const onInteraction = (provider, caller, handler, controlId, controlType, actionType, intent) => {
    handler && handler();

    // Make sure developers are not manually trying to interact with the telemetry state
    if (['withTelemetry'].indexOf(caller) === -1) {
        console.warn("You are trying to modify the internal telemetry state from outside one of its components. This is not recommended!");
    }

    const interaction = generateNewInteraction(controlId, controlType, actionType, intent);


    console.log("Updated: ", interaction);

    if (intent.completion) {
        closeSession(interaction);
    } else {
        updateSession(interaction);
    }
};


// const onPrediction = (prediction) => {
//
// };

export {onInteraction};
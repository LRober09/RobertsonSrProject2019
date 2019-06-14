import {generateId} from "../util/telemUtil";
import {fetchWrapper} from '../util/apiWrapper';

/**
 * Initialize the telemetry service
 * @param options An object containing at least a 'telemetryApiUri' field, and optionally a userId field
 */
const initTelemetryService = (options) => {
    const userId = options.userId || generateId();
    if (!options.telemetryApiUri && !globalState.telemetryApiUri) {
        throw new Error('Cannot initialize telemetry global state - no telemetry API URI provided');
    }

    globalState.telemetryApiUri = options.telemetryApiUri;
    globalState.userId = userId;

    generateNewSession();
};

const globalState = {
    initialized: false,
    userId: null,
    telemetryApiUri: null,

    currentSession: {
        userId: null,
        sessionId: null,
        interactions: [],
        intentLabel: null,
        sessionEndDateTime: null,
    },

    initTelemetryService: initTelemetryService,
};

const requestQueue = {

};

/**
 * Returns the global state
 * @returns {{currentSession: {sessionEndDateTime: null, intentLabel: null, sessionId: null, userId: null, interactions: Array}, initTelemetryService: initTelemetryService, initialized: boolean, userId: null, telemetryApiUri: null}}
 */
const getGlobalState = () => globalState;

/**
 * Generates a new session in the gobal state (overwrites the existing one)
 */
const generateNewSession = () => {
    if (!globalState.userId || !globalState.telemetryApiUri) {
        throw new Error('Could not generate new session - telemetry state is not initialized');
    }

    globalState.currentSession = {
        userId: globalState.userId,
        sessionId: generateId(),
        interactions: [],
        intentLabel: null,
        sessionEndDateTime: null,
    }
};

/**
 * Ends the current session, sets the intent of the session, and uploads the session to the Telemetry API
 */
const closeSession = (interaction) => {
    globalState.currentSession.interactions.push(interaction);
    globalState.currentSession.interactions = globalState.currentSession.interactions.sort((a, b) => {
        return a.dateTime >= b.dateTime;
    });
    const interactions = globalState.currentSession.interactions;
    const intentInteraction = interactions[interactions.length - 1];

    globalState.currentSession.sessionEndDateTime = intentInteraction.dateTime;
    globalState.currentSession.intentLabel = intentInteraction.intent.label;

    const currentSession = globalState.currentSession;
    fetchWrapper(currentSession, globalState.telemetryApiUri + '/sessions', 'POST', (response) => {
        console.log('Updated prediction response: ', response)
    }, (err) => {
        console.error('Error: ', err);
    }, () => {
        console.log('Pushing session to server: ', currentSession);
    });

    generateNewSession();
};

/**
 * Helper function to generate an interaction object
 * @param controlId The control's unique identifier string
 * @param controlType The control type (navigation or mutation)
 * @param actionType The control action type (click, onBlur, etc)
 * @param intent The intent object of the control, if it has one
 * @returns {{dateTime: string, actionType: *, controlType: *, controlId: *, intent: *}}
 */
const generateNewInteraction = (controlId, controlType, actionType, intent) => {
    return {
        dateTime: new Date().toISOString(),
        controlId: controlId,
        controlType: controlType,
        actionType: actionType,
        intent: intent ? {
            completion: intent.completion || null,
            label: intent.label || null,
        } : null,
    }
};


const updateSession = (interaction) => {
    if (!globalState.userId || !globalState.telemetryApiUri) {
        throw new Error('Could not generate new session - telemetry state is not initialized');
    }

    globalState.currentSession.interactions.push(interaction);

    const currentSession = globalState.currentSession;
    fetchWrapper(currentSession, globalState.telemetryApiUri + '/sessions', 'PATCH', (response) => {
        console.log('Updated prediction response: ', response)
    }, (err) => {
        console.error('Error: ', err);
    }, () => {
        console.log('Pushing session to server: ', currentSession);
    });
};

const setUserId = (userId) => {
    globalState.userId = userId;
    globalState.currentSession.userId = userId;
};


export {
    getGlobalState,
    initTelemetryService,
    generateNewSession,
    closeSession,
    generateNewInteraction,
    updateSession,
    setUserId
};
import {usersUrl, cartUrl, loginUrl, logoutUrl} from "./variables";
import {fetchWrapper, fetchWrapperAuthenticated} from "./fetchWrapper";
import {setUserId} from "../telemetry/context/TelemetryGlobal";

const loginUser = (loginObject, onSuccess, onError, onStart, onComplete) => {
    fetchWrapper(loginObject, loginUrl, 'POST', (result) => {
        setUserId(result._id);
        onSuccess(result);
    }, onError, onStart, onComplete);
};


const logoutUser = (token, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, null, logoutUrl, 'POST', onSuccess, onError, onStart, onComplete);
};


const getUser = (token, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, null, usersUrl, 'GET', (result) => {
        setUserId(result._id);
        onSuccess(result);
    }, onError, onStart, onComplete);
};


const changeUserPassword = (token, newPassword, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, {password: newPassword}, usersUrl, 'PATCH', onSuccess, onError, onStart, onComplete);
};

const changeUserAddress = (token, address, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, {profile: {address: address}}, usersUrl, 'PATCH', onSuccess, onError, onStart, onComplete);
};

const addToUserCart = (token, productId, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, {productId: productId}, cartUrl, 'POST', onSuccess, onError, onStart, onComplete);
};

const removeFromUserCart = (token, productId, onSuccess, onError, onStart, onComplete) => {
    fetchWrapperAuthenticated(token, {productId: productId}, cartUrl, 'DELETE', onSuccess, onError, onStart, onComplete);
};

const registerUser = (newUserObject, onSuccess, onError, onStart, onComplete) => {
    fetchWrapper(newUserObject, usersUrl, 'POST', onSuccess, onError, onStart, onComplete);
};


export {getUser, loginUser, logoutUser, registerUser, changeUserPassword, changeUserAddress, addToUserCart, removeFromUserCart};
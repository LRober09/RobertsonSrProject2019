# RobertsonSrProject2019

## Configuring for Local Development

Ensure you have the following applications installed:
* Node.js & NPM
* MongoDB (local server)
* Webstorm IDE (Highly recommended and free with .edu email)

### Frontend/Test Site
1. Navigate to the the `client_frontend` directory with your CLI of choice
2. Run `npm install` to download all necessary modules
3. Run `npm start` to launch the development server

### Node.js Services (telemetry_api, prediction_api, client_api)
1. Navigate to the root directory of the service
2. Run `npm install`
3. Start the application with `node index.js`

OR 
4. Run `npm install -g nodemon`
5. Navigate to the root directory of the service
6. Run `nodemon` to allow the application to automatically restart after code updates

### Configuring MongoDB
The connection strings in the codebase are already set to the free sandbox cluster using MongoDB Cloud Atlas. 
However, if you wish to develop with a local instance of MongoDB server, you can update the connection strings
within `<root>/src/db/mongo.js` for any of the given Node.js applications.

The authentication information for MongoDB Cloud is located in the senior project final report

### Quick Introduction to the Telemetry Frontend
The Telemetry frontend components are located [here](https://github.com/LRober09/RobertsonSrProject2019/tree/master/client_frontend/src/telemetry),
and these are examples of the telemetry HOC implementation:
* [TelemButton](https://github.com/LRober09/RobertsonSrProject2019/blob/master/client_frontend/src/components/common/TelemButton.js)
* [TelemNavLink](https://github.com/LRober09/RobertsonSrProject2019/blob/master/client_frontend/src/components/common/TelemNavLink.js)
* [TelemGeneric](https://github.com/LRober09/RobertsonSrProject2019/blob/master/client_frontend/src/components/common/TelemGeneric.js)

TelemButton and TelemNavLink are examples of pre-existing wrapped components, and 
TelemGeneric is an example of a component that provides `onClick` logging for 
any single child component given to it.

Any Telem* component requires the props `controlId`, `controlType`, and `actionType`, and I
highly recommend keeping these props stored in a separate file or files like [this](https://github.com/LRober09/RobertsonSrProject2019/blob/master/client_frontend/src/util/telemetryOptions.js).

The `intent` prop should be included on any intent-completion control (see final report),
and `controlIdSuffix` should be used any time you are presenting multiple instances of a
component. When used, the value of `controlIdSuffix` is appended to the end of `controlId`
to differentiate between the components, so I suggest using an identifier unique to the
content or data displayed by the component (for example, `productId`).


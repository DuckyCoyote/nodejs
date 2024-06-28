"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const request_validation_error_1 = require("../errors/request-validation-error");
const database_connection_error_1 = require("../errors/database-connection-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof request_validation_error_1.RequestValidationError) {
        console.log(err);
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    if (err instanceof database_connection_error_1.DatabaseConnectionError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    return res.status(400).json({ errors: [{ message: 'Something went wrong' }] });
};
exports.errorHandler = errorHandler;

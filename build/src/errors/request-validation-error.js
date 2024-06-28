"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
class RequestValidationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            if (err.type === 'field')
                return { message: err.msg, field: err.path };
        });
    }
}
exports.RequestValidationError = RequestValidationError;

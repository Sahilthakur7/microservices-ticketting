import { ValidationError } from "express-validator";

const formatValidationError = (error: ValidationError) => {
  return {
    message: error.msg,
    field: error.param,
  };
};
export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    //only because we are extending built in object
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    const formattedErrors = this.errors.map(formatValidationError);
  }
}

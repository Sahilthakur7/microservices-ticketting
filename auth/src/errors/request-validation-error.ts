import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

const formatValidationError = (error: ValidationError) => {
  return {
    message: error.msg,
    field: error.param,
  };
};
export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    //only because we are extending built in object
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    const formattedErrors = this.errors.map(formatValidationError);
  }
}

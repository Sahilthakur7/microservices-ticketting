export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  statusCode = 500;

  constructor() {
    super();

    //only because we are extending built in object
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

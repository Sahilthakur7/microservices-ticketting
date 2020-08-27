export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();

    //only because we are extending built in object
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

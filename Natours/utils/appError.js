class appError extends Error {
  //The constructor method is called each time we create a new obj out of this class.
  constructor(message, statuscode) {
    super(message);

    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = appError;

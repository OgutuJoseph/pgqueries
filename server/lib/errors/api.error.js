/*
 * Reference: https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216
 */

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Assigning default message if none is given
    this.message = message || 'Internal Server Error';

    // Using 500 as default value if none is specified.
    this.status = statusCode || 500;
  }
}

module.exports = APIError;

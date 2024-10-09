export class CustomError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, data?: string) {
    super(message, 400, data);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string, data?: string) {
    super(message, 401, data);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, data?: string) {
    super(message, 404, data);
  }
}
export class NotAcceptable extends CustomError {
  constructor(message: string, data?: string) {
    super(message, 406, data);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, data?: any) {
    super(message, 500, data);
  }
}

export interface ErrorResponse<T> {
  status: number,
  type: ErrorResponseStatus,
  message: string,
  errors: T[]
}

export interface ValidationErrorResponse extends ErrorResponse<ValidationError> {
  type: ErrorResponseStatus.VALIDATION_ERROR
}

export interface ArgumentErrorResponse<T> extends ErrorResponse<T> {
  type: ErrorResponseStatus.ARGUMENT_ERROR
}

export type ValidationError = {
  field: string,
  messages: string[]
}

export enum ErrorResponseStatus {
  VALIDATION_ERROR = "Validation Error",
  ARGUMENT_ERROR = "Argument Error"
}

export type AvailableErrors = ValidationErrorResponse | ArgumentErrorResponse<unknown>

export class ValidationException extends Error implements ValidationErrorResponse {
  status: number
  type: ErrorResponseStatus.VALIDATION_ERROR
  errors: ValidationError[]

  constructor({ status, type, message, errors }: ValidationErrorResponse) {
    super(message)
    this.status = status;
    this.type = type;
    this.errors = errors;
  }
}
export const STATUS_CODES = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

export const ERROR_CODES = Object.freeze({
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not_found',
  BAD_REQUEST: 'bad_request',
  DEVICES_LIMIT_REACHED: 'devices_limit_reached',
  VALIDATION_FAILED: 'validation_failed',
  INTERNAL_SERVER_ERROR: 'internal_server_error',
  UNAUTHORIZED: 'unauthorized',
  EMAIL_TAKEN: 'email_taken',
  USERNAME_TAKEN: 'username_taken',
  IMPORT_IN_PROGRESS: 'import_in_progress',
  AUTH_TOKEN_EXPIRED: 'auth_token_expired',
  AUTH_TOKEN_INVALID_ISSUER: 'auth_token_invalid_issuer',
});

export const RESPONSE_MESSAGES = Object.freeze({
  NOT_FOUND: 'Not Found',
  FORBIDDEN: `This action isn't available for your role`,
  FILE_NOT_FOUND: 'File was not found',
  BAD_REQUEST: 'Bad Request',
  DEFAULT_ERROR_MESSAGE: 'Internal Server Error.',
  VALIDATION_FAILED: 'Validation failed.',
  UNAUTHORIZED: 'Unauthorized',
  SUCCESS: 'Success',
});

export const ENVIRONMENTS = Object.freeze({
  DEV: 'development',
});

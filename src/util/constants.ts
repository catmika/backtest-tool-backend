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

export const TIMEFRAMES = Object.freeze({
  m1: '1min',
  m5: '5min',
  m15: '15min',
  m30: '30min',
  m45: '45min',
  h1: '1h',
  h2: '2h',
  h4: '4h',
  D: '1day',
  W: '1week',
  M: '1month',
} as const);

export const TIMEZONES = Object.freeze({
  Exchange: 'Exchange',
  'Pacific/Honolulu': 'GMT-10',
  'America/Anchorage': 'GMT-09',
  'America/Los_Angeles': 'GMT-08',
  'America/Denver': 'GMT-07',
  'America/Chicago': 'GMT-06',
  'America/New_York': 'GMT-05',
  'America/Caracas': 'GMT-04',
  'America/Sao_Paulo': 'GMT-03',
  'America/Noronha': 'GMT-02',
  'Atlantic/Azores': 'GMT-01',
  UTC: 'GMT',
  'Europe/Paris': 'GMT+01',
  'Europe/Helsinki': 'GMT+02',
  'Europe/Moscow': 'GMT+03',
  'Asia/Dubai': 'GMT+04',
  'Asia/Karachi': 'GMT+05',
  'Asia/Dhaka': 'GMT+06',
  'Asia/Bangkok': 'GMT+07',
  'Asia/Hong_Kong': 'GMT+08',
  'Asia/Tokyo': 'GMT+09',
  'Australia/Sydney': 'GMT+10',
  'Pacific/Noumea': 'GMT+11',
  'Pacific/Auckland': 'GMT+12',
} as const);

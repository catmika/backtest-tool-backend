import { ErrorHandler } from '../../util/errorHandler';
import { STATUS_CODES, RESPONSE_MESSAGES } from '../../util/constants';
import { ValidationResult } from 'joi';

export default (schema: any) => {
  return function (req: any, res: any, next: any) {
    try {
      let result: ValidationResult<any>;
      if (schema.query) {
        result = schema.query.validate(req.query);
      } else if (schema.params) {
        result = schema.params.validate(req.params);
      } else {
        result = schema.validate(req.body);
      }

      if (result.error) {
        const errors = result.error.details.map((e: any) => e.message);

        return next(
          new ErrorHandler(
            RESPONSE_MESSAGES.VALIDATION_FAILED,
            STATUS_CODES.BAD_REQUEST,
            { errors },
          ),
        );
      }

      if (schema.query) {
        req.query = result.value;
      }

      if (schema.params) {
        req.params = result.value;
      }

      if (!schema.query && !schema.params) {
        req.body = result.value;
      }

      return next();
    } catch (err: any) {
      return next(
        new ErrorHandler(err.message, STATUS_CODES.INTERNAL_SERVER_ERROR),
      );
    }
  };
};

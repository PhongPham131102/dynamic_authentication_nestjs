import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RESPONSE_STATUS } from 'src/utils/response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseException = exception.getResponse();
    response.status(status).json({
      statusCode: RESPONSE_STATUS.FAILED,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof responseException === 'object' && responseException !== null
        ? responseException
        : { message: responseException }),
    });
  }
}

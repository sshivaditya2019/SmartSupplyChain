/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { ErrorCode } from './errorCodes';
import { UIError } from './uiError';

export class ErrorFactory {
  public static fromException(exception: any): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    const error = new UIError(
      'Desktop UI',
      ErrorCode.generalUIError,
      'A technical problem was encountered in the UI',
      exception.stack
    );

    error.details = ErrorFactory._getExceptionMessage(exception);
    return error;
  }

  public static fromLoginRequired(): UIError {
    return new UIError(
      'Login',
      ErrorCode.loginRequired,
      'No access token is available and a login is required'
    );
  }

  public static fromLoginOperation(exception: any, errorCode: string): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    const error = new UIError(
      'Login',
      errorCode,
      'A technical problem occurred during login processing',
      exception.stack
    );

    error.details = ErrorFactory._getOAuthExceptionMessage(exception);
    return error;
  }

  public static fromLogoutOperation(
    exception: any,
    errorCode: string
  ): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    const error = new UIError(
      'Logout',
      errorCode,
      'A technical problem occurred during logout processing',
      exception.stack
    );

    error.details = ErrorFactory._getOAuthExceptionMessage(exception);
    return error;
  }

  public static fromTokenError(exception: any, errorCode: string): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    const error = new UIError(
      'Token',
      errorCode,
      'A technical problem occurred during token processing',
      exception.stack
    );

    error.details = ErrorFactory._getOAuthExceptionMessage(exception);
    return error;
  }

  public static fromRenderError(
    exception: any,
    componentStack?: string
  ): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    const error = new UIError(
      'Desktop UI',
      ErrorCode.renderError,
      'A technical problem was encountered rendering the UI',
      exception.stack
    );

    error.details = ErrorFactory._getExceptionMessage(exception);
    if (componentStack) {
      error.details += ` : ${componentStack}`;
    }

    return error;
  }

  public static fromApiError(exception: any, url: string): UIError {
    if (exception instanceof UIError) {
      return exception;
    }

    let statusCode = 0;
    if (exception.response && exception.response.status) {
      statusCode = exception.response.status;
    }

    let error = null;
    if (statusCode === 0) {
      error = new UIError(
        'Network',
        ErrorCode.apiNetworkError,
        'A network problem occurred when the UI called the Web API',
        exception.stack
      );
      error.details = this._getExceptionMessage(exception);
    } else if (statusCode >= 200 && statusCode <= 299) {
      error = new UIError(
        'Data',
        ErrorCode.apiDataError,
        'A technical problem occurred parsing received data from the Web API',
        exception.stack
      );
      error.details = this._getExceptionMessage(exception);
    } else {
      error = new UIError(
        'API',
        ErrorCode.apiResponseError,
        'A technical problem occurred when the UI called the Web API',
        exception.stack
      );
      error.details = this._getExceptionMessage(exception);

      if (
        exception.response &&
        exception.response.data &&
        typeof exception.response.data === 'object'
      ) {
        ErrorFactory._updateFromApiErrorResponse(
          error,
          exception.response.data
        );
      }
    }

    error.statusCode = statusCode;
    error.url = url;
    return error;
  }

  private static _updateFromApiErrorResponse(
    error: UIError,
    apiError: any
  ): void {
    if (apiError) {
      if (apiError.code && apiError.message) {
        error.errorCode = apiError.code;
        error.details = apiError.message;
      }

      if (apiError.area && apiError.id && apiError.utcTime) {
        error.setApiErrorDetails(apiError.area, apiError.id, apiError.utcTime);
      }
    }
  }

  private static _getOAuthExceptionMessage(exception: any): string {
    let oauthError = '';
    if (exception.error) {
      oauthError = exception.error;
      if (exception.errorDescription) {
        oauthError += ` : ${exception.errorDescription}`;
      }
    }

    if (oauthError) {
      return oauthError;
    }
    return ErrorFactory._getExceptionMessage(exception);
  }

  private static _getExceptionMessage(exception: any): string {
    if (exception.message) {
      return exception.message;
    }

    if (exception.errorSummary) {
      return exception.errorSummary;
    }

    const details = exception.toString();
    if (details !== {}.toString()) {
      return details;
    }

    return '';
  }
}

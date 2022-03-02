/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
import moment from 'moment';
import { ErrorLine } from './errLine';
import { UIError } from './uiError';

export class ErrorFormatter {
  private _count = 0;

  public getErrorLines(error: UIError): ErrorLine[] {
    const lines: ErrorLine[] = [];

    lines.push(
      this._createErrorLine('User Action', error.userAction, 'highlightcolor')
    );

    if (error.message.length > 0) {
      lines.push(this._createErrorLine('Info', error.message));
    }

    if (error.utcTime.length > 0) {
      const displayTime = moment(error.utcTime).format('DD MMM YYYY HH:mm:ss');
      lines.push(this._createErrorLine('UTC Time', displayTime));
    }

    if (error.area.length > 0) {
      lines.push(this._createErrorLine('Area', error.area));
    }

    if (error.errorCode.length > 0) {
      lines.push(this._createErrorLine('Error Code', error.errorCode));
    }

    if (error.instanceId > 0) {
      lines.push(
        this._createErrorLine('Instance Id', error.instanceId.toString())
      );
    }

    if (error.statusCode > 0) {
      lines.push(
        this._createErrorLine('Status Code', error.statusCode.toString())
      );
    }

    if (error.details.length > 0) {
      lines.push(this._createErrorLine('Details', error.details));
    }

    if (error.url.length > 0) {
      lines.push(this._createErrorLine('URL', error.url));
    }

    return lines;
  }

  public getErrorStack(error: UIError): ErrorLine | null {
    if (SHOW_STACK_TRACE) {
      if (error.stack) {
        return this._createErrorLine('Stack', error.stack);
      }
    }

    return null;
  }

  private _createErrorLine(
    label: string,
    value: string,
    valueStyle = 'valuecolor'
  ): ErrorLine {
    return {
      id: ++this._count,
      label,
      value,
      valueStyle,
    };
  }
}

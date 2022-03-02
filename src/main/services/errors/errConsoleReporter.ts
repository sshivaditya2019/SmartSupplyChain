/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { ErrorFormatter } from './errorFormatter';
import { UIError } from './uiError';

export class ErrorConsoleReporter {
  public static output(error: UIError): void {
    const lines = new ErrorFormatter().getErrorLines(error);
    lines.forEach((l) => {
      console.log(`${l.label}: ${l.value}`);
    });
  }
}

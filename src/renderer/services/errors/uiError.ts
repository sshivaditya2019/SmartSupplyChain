/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
export class UIError extends Error {
  private _area: string;

  private _errorCode: string;

  private _userAction: string;

  private _utcTime: string;

  private _statusCode: number;

  private _instanceId: number;

  private _details: string;

  private _url: string;

  public constructor(
    area: string,
    errorCode: string,
    userMessage: string,
    stack?: string | undefined
  ) {
    super(userMessage);

    this._area = area;
    this._errorCode = errorCode;
    this._userAction = 'Please Enter the Operation to be Performed';
    this._utcTime = new Date().toISOString();
    this._statusCode = 0;
    this._instanceId = 0;
    this._details = '';
    this._url = '';

    Object.setPrototypeOf(this, new.target.prototype);

    if (stack) {
      this.stack = stack;
    }
  }

  public get area(): string {
    return this._area;
  }

  public get errorCode(): string {
    return this._errorCode;
  }

  public set errorCode(value: string) {
    this._errorCode = value;
  }

  public get userAction(): string {
    return this._userAction;
  }

  public set userAction(value: string) {
    this._userAction = value;
  }

  public get utcTime(): string {
    return this._utcTime;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public set statusCode(value: number) {
    this._statusCode = value;
  }

  public get instanceId(): number {
    return this._instanceId;
  }

  public get details(): string {
    return this._details;
  }

  public set details(value: string) {
    this._details = value;
  }

  public get url(): string {
    return this._url;
  }

  public set url(value: string) {
    this._url = value;
  }


  public setApiErrorDetails(area: string, id: number, utcTime: string): void {
    this._area = area;
    this._instanceId = id;
    this._utcTime = utcTime;
  }

  public toLogFormat(): string {
    const error: any = {
      area: this._area,
      code: this._errorCode,
      message: this.message,
      userAction: this._userAction,
      utcTime: this._utcTime,
    };

    if (this._statusCode) {
      error.statusCode = this._statusCode;
    }
    if (this._instanceId) {
      error.instanceId = this._instanceId;
    }
    if (this._url) {
      error.url = this._url;
    }
    if (this._details) {
      error.details = this._details;
    }

    if (this.stack) {
      const frames: string[] = [];
      const items = this.stack.split('\n').map((x: string) => x.trim());
      items.forEach((i) => {
        frames.push(i);
      });

      error.stack = frames;
    }

    return JSON.stringify(error, null, 2);
  }
}

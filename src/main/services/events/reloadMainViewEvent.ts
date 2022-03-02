/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export class ReloadMainViewEvent {
  private readonly _causeError: boolean;

  public constructor(causeError: boolean) {
    this._causeError = causeError;
  }

  public get causeError(): boolean {
    return this._causeError;
  }
}

/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export class DataStatusEvent {
  private readonly _loaded: boolean;

  public constructor(loaded: boolean) {
    this._loaded = loaded;
  }

  public get loaded(): boolean {
    return this._loaded;
  }
}

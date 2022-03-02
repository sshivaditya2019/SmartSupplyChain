/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export class NavigateEvent {
  private readonly _mainView: boolean;

  public constructor(mainView: boolean) {
    this._mainView = mainView;
  }

  public get isMainView(): boolean {
    return this._mainView;
  }
}

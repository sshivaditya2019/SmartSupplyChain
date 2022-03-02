/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Internal types
type SuccessCallback = () => void;
type ErrorCallback = (error: any) => void;

export class ConcurrentActionHandler {
  private _callbacks: [SuccessCallback, ErrorCallback][];

  public constructor() {
    this._callbacks = [];
  }

  /*
   * Run the supplied action once and return a promise while in progress
   */
  public async execute(action: () => Promise<void>): Promise<void> {
    // Create a promise through which to return the result
    const promise = new Promise<any>((resolve, reject) => {
      const onSuccess = () => {
        resolve(null);
      };

      const onError = (error: any) => {
        reject(error);
      };

      this._callbacks.push([onSuccess, onError]);
    });

    // Only do the work for the first UI view that calls us
    const performAction = this._callbacks.length === 1;
    if (performAction) {
      try {
        // Do the work
        await action();

        // On success resolve all promises
        this._callbacks.forEach((c) => {
          c[0]();
        });
      } catch (e) {
        // On failure resolve all promises with the same error
        this._callbacks.forEach((c) => {
          c[1](e);
        });
      }

      // Reset once complete
      this._callbacks = [];
    }

    // Return the promise
    return promise;
  }
}

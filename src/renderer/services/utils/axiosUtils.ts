/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class AxiosUtils {
  public static checkJson(data: any): void {
    if (typeof data !== 'object') {
      const error: any = new Error('JSON Parse Error');
      error.response = {
        status: 200,
      };
      throw error;
    }
  }
}

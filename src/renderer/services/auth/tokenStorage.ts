/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
import KeyTar from 'keytar';
import OperatingSystemUserName from 'username';
import { TokenData } from './tokenDat';

const APP_STORAGE_ID_TOK = 'SSS.Desktop.IdToken';
const APP_STORAGE_REFERESH_TOKEN = 'SSS.Desktop.RefreshToken';

export class TokenStorage {
  public static async load(): Promise<TokenData | null> {
    if (!TokenStorage._userName) {
      TokenStorage._userName = await OperatingSystemUserName();
    }

    const refershToken = await KeyTar.getPassword(
      APP_STORAGE_REFERESH_TOKEN,
      this._userName
    );
    const idToken = await KeyTar.getPassword(
      APP_STORAGE_ID_TOK,
      this._userName
    );
    if (!refershToken || !idToken) {
      return null;
    }

    return {
      accessToken: null,
      refershToken,
      idToken,
    };
  }


  public static async delete(): Promise<void> {
    await KeyTar.deletePassword(APP_STORAGE_ID_TOK, this._userName);
    await KeyTar.deletePassword(APP_STORAGE_REFERESH_TOKEN, this._userName);
  }

  private static _userName: string;
}

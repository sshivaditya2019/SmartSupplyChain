/* eslint-disable import/prefer-default-export */
import fs from 'fs-extra';
import { Configuration } from './configuration';

export class ConfigurationLoader {
  public static load(configFilePath: string): Configuration {
    const configurationBuffer = fs.readFileSync(configFilePath);
    return JSON.parse(configurationBuffer.toString());
  }
}

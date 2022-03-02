import { AppConfiguration } from './appConfiguration';
import { OAuthConfiguration } from './oauthConfiguration';

export interface Configuration {
  app: AppConfiguration;
  oauth: OAuthConfiguration;
}

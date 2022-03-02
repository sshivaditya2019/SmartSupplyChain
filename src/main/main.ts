/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Menu, protocol } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Opener from 'opener';
import MenuBuilder from './menu';
import template from './menu-function';
import { resolveHtmlPath } from './util';

import { Configuration } from './utils/configuration/configuration';
import { TokenData } from './services/auth/tokenDat';
import { TokenStorage } from './services/auth/tokenStorage';
import { IpcEventNames } from './utils/ipcEventNames';

const PROTOCOL_PREFIX = 'sss';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let _configuration: Configuration | null;
let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('min', () => {
  const wins = BrowserWindow.getFocusedWindow();
  wins?.minimize();
});

ipcMain.handle('getbw', async () => {
  const bw = BrowserWindow.getFocusedWindow();
  return bw;
});

ipcMain.on('login', () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });
});

ipcMain.on('max', () => {
  const wins = BrowserWindow.getFocusedWindow();
  wins?.maximize();
});

ipcMain.on('close', () => {
  const wins = BrowserWindow.getFocusedWindow();
  wins?.close();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(mainWindow.webContents);
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = Menu.buildFromTemplate(template);
  //  Menu.setApplicationMenu(menuBuilder);

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

///

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.setAsDefaultProtocolClient('sss');
let link: string;
app.on('open-url', function (event, data) {
  event.preventDefault();
  link = data;
  if (mainWindow?.webContents) {
    mainWindow.webContents.send('open-url', data);
  }
  console.log('Protocol Reached');
  protocol.registerHttpProtocol(PROTOCOL_PREFIX, (req, cb) => {
    console.log('Called');
  });
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

module.exports.getLink = () => link;

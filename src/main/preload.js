/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable global-require */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const { BrowserWindow, remote } = require('@electron/remote');
const { dialog, protocol } = require('electron');
const { contextBridge, ipcRenderer, shell } = require('electron');

const PROTOCOL_PREFIX = 'gets';

function ExecOnAttach() {
  mainWiin = new BrowserWindow({ width: 1000, height: 800 });
  protocol.registerHttpProtocol(PROTOCOL_PREFIX, (req, cb) => {
    mainWindow.loadURL('http://google.com');
  });
}

function createBrowserWindow(link) {
  const remote = require('@electron/remote');
  const win = new BrowserWindow({
    width: 800,
    height: 800,
  });
  win.loadURL(link);
  return win;
}

function openInBrowser(link) {
  shell.openExternal(link);
}

contextBridge.exposeInMainWorld('electron', {
  bws: {
    getWin(link) {
      // const winss = createBrowserWindow(link);
      openInBrowser(link);
    },
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    login() {
      ipcRenderer.send('login');
    },

    min() {
      ipcRenderer.send('min');
    },
    max() {
      ipcRenderer.send('max');
    },
    close() {
      ipcRenderer.send('close');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

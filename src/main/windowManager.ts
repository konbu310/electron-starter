import { BrowserWindow } from "electron";
import loadDevtool from "electron-load-devtool";
import * as path from "path";

// ______________________________________________________
//
// @ CONSTANTS
//
const isProduction = process.env.NODE_ENV === "production";

// ______________________________________________________
//
// @ Create Main Window
//
export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Devtoolの読み込み
  loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch(e => console.error(e));

  return mainWindow;
};

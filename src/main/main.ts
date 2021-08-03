import { app, BrowserWindow, session } from "electron";
import path from "path";
import { loadReactDevtools } from "./loadReactDevtools";
import { initializeIpcEvents, releaseIpcEvents } from "./ipcMain";

const isProduction = process.env.NODE_NEV === "production";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!isProduction) {
    win.webContents.openDevTools();
  }

  win.loadFile("dist/index.html").catch((err) => console.error(err));
};

app.whenReady().then(async () => {
  createWindow();
  initializeIpcEvents();

  if (!isProduction) {
    await loadReactDevtools().catch(console.error);
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  releaseIpcEvents();
  if (process.platform !== "darwin") app.quit();
});

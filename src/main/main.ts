import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./windowManager";

let mainWindow: BrowserWindow | null = null;

// ______________________________________________________
//
// @ Ready
//
app.on("ready", async () => {
  mainWindow = createMainWindow();

  mainWindow.on("close", () => {
    mainWindow = null;
  });
});

// ______________________________________________________
//
// @ Activate
//
app.on("activate", () => {
  if (mainWindow) {
    app.show();
  } else {
    mainWindow = createMainWindow();
  }
});

// ______________________________________________________
//
// @ Quit
//
app.on("quit", () => {
  app.quit();
});

// ______________________________________________________
//
// @ Closed
//
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

import { app, BrowserWindow, session } from "electron";
import { createMainWindow } from "./windowManager";
import os from "os";
import path from "path";

const reactDevToolsPath = path.join(
  os.homedir(),
  "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_0"
);

let mainWindow: BrowserWindow | null = null;

// ______________________________________________________
//
// @ Ready
//
app.whenReady().then(async () => {
  await session.defaultSession
    .loadExtension(reactDevToolsPath, { allowFileAccess: true })
    .catch((err) => {
      console.error(err);
    });

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

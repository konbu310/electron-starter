import { app, BrowserWindow, session } from "electron";
import os from "os";
import path from "path";

const isProduction = process.env.NODE_NEV === "production";

const reactDevToolsPath = path.join(
  os.homedir(),
  "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_0"
);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (!isProduction) {
    win.webContents.openDevTools();
  }

  win.loadFile("dist/index.html").catch((err) => console.error(err));
};

const loadReactExtension = async () => {
  await session.defaultSession
    .loadExtension(reactDevToolsPath, {
      allowFileAccess: true,
    })
    .catch((err) => {
      console.error(err);
    });
};

app.whenReady().then(async () => {
  createWindow();
  await loadReactExtension();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

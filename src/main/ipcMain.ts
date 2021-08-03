import { shell, ipcMain } from "electron";

let initialized = false;

export const initializeIpcEvents = () => {
  if (initialized) return;
  initialized = true;

  ipcMain.handle("openElectronDocs", () =>
    shell.openExternal("https://www.electronjs.org/docs/latest/")
  );
};

export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeHandler("openElectronDocs");
  }

  initialized = false;
};

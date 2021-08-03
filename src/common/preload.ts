import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  openElectronDocs: async () => await ipcRenderer.invoke("openElectronDocs"),
});

export type GlobalApi = {
  openElectronDocs: VoidFunction;
};

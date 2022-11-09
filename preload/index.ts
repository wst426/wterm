import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
  handleSizeChange: (callback: () => (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on("onSizeChange", callback)
});
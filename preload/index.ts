import { contextBridge, ipcRenderer } from "electron";

type Callback = () => (event: Electron.IpcRendererEvent, ...args: any[]) => void;

contextBridge.exposeInMainWorld('api', {
  handleSizeChange: (callback: Callback) => ipcRenderer.on("onSizeChange", callback),
  handleData: (callback: Callback) => ipcRenderer.on("onData", callback),
  input: (text: string) => ipcRenderer.send("onInput", text)
});
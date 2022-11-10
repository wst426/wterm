import os from "os";
import path from "path";
import process from "process";
import { app, BrowserWindow, ipcMain } from "electron";
import { spawn } from "node-pty";

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'sh';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, "..", "index.html"));
  win.webContents.send("onSizeChange", {
    width: win.getContentBounds().width,
    height: win.getContentBounds().height
  });

  const pty = spawn(shell, [], {
    name: "wterm",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env as any
  });

  pty.onData(data => {
    win.webContents.send("onData", data);
  });

  ipcMain.on("onInput", (e, arg) => {
    pty.write(arg);
  });

  win.on("resize", () => {
    win.webContents.send("onSizeChange", {
      width: win.getContentBounds().width,
      height: win.getContentBounds().height
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

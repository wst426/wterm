import path from "path";
import { app, BrowserWindow } from "electron";

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

import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 380,
    height: 600,
    minWidth: 300,
    minHeight: 400,
    resizable: true,
    frame: true,
    titleBarStyle: "hiddenInset", // native macOS style
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // In development, load from Vite dev server
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // In production, load the build
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.png'),  // Set the app icon
    frame: false,  // Makes the window frameless
    webPreferences: {
        preload: path.join(__dirname, 'renderer.js'),  // Load renderer.js
        contextIsolation: false,
        nodeIntegration: true,
      },
  });

  win.loadFile('index.html');

    // Listen for close requests from the renderer process
    ipcMain.on('close-app', () => {
      win.close();
  });
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


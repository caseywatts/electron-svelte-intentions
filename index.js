const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, globalShortcut } = require("electron");
const path = require("path");

let openDevTools = false;
let tray;
let mainWindow;

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("public/index.html");
  if (openDevTools) {
    mainWindow.webContents.openDevTools();
  }
  return mainWindow;
}

const setUpTrayAndContextMenu = function () {
  const icon = nativeImage.createFromPath("hae.png");
  traySetup = new Tray(icon);

  traySetup.setTitle("initial");
  // traySetup.setToolTip("lol tooltip");
  // const contextMenu = Menu.buildFromTemplate([{ role: "quit" }]);
  // traySetup.setContextMenu(contextMenu);
  return traySetup;
};

app.whenReady().then(function () {
  mainWindow = createWindow();
  tray = setUpTrayAndContextMenu();

  function handleSetTitle(event, title) {
    // const webContents = event.sender;
    // const win = BrowserWindow.fromWebContents(webContents);
    // win.setTitle(title);
    tray.setTitle(title);
  }

  const toggleWindow = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  };

  tray.on("click", toggleWindow);

  globalShortcut.register("Control+`", () => {
    toggleWindow();
  });

  ipcMain.on("set-title", handleSetTitle);
  ipcMain.on("toggle-window", toggleWindow);
  // if (is.osx()) {
  //   app.dock.hide();
  // }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

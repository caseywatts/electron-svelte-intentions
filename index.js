const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require("electron");
const path = require("path");

let openDevTools = true;
let tray;

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
}

const setUpTrayAndContextMenu = function () {
  const icon = nativeImage.createFromPath("hae.png");
  traySetup = new Tray(icon);

  traySetup.setTitle("initial");
  // traySetup.setToolTip("lol tooltip");
  const contextMenu = Menu.buildFromTemplate([{ role: "quit" }]);
  traySetup.setContextMenu(contextMenu);
  return traySetup;
};

app.whenReady().then(function () {
  createWindow();
  tray = setUpTrayAndContextMenu();

  function handleSetTitle(event, title) {
    debugger;
    // const webContents = event.sender;
    // const win = BrowserWindow.fromWebContents(webContents);
    // win.setTitle(title);
    tray.setTitle(title);
  }

  ipcMain.on("set-title", handleSetTitle);
  // if (is.osx()) {
  //   app.dock.hide();
  // }
});

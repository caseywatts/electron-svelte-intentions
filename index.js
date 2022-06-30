const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, globalShortcut } = require("electron");
const path = require("path");

let openDevTools = false;
let tray;
let mainWindow;
let icons;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 100,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
  });
  mainWindow.loadFile("public/index.html");
  if (openDevTools) {
    mainWindow.webContents.openDevTools();
    // mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  return mainWindow;
}

const setUpTrayAndContextMenu = function () {
  const icon = nativeImage.createFromPath("hae.png");
  traySetup = new Tray(icon);

  traySetup.setTitle("");
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
  app.dock.hide();
  mainWindow.on("close", (ev) => {
    ev.sender.hide();
    ev.preventDefault(); // prevent quit process
  });
  mainWindow.on("blur", (ev) => {
    ev.sender.hide();
    // ev.preventDefault(); // prevent quit process
  });

  // icons = new BrowserWindow({
  //   show: false,
  //   webPreferences: { offscreen: true },
  // });
  // icons.loadURL("https://trends.google.com/trends/hottrends/visualize");
  // icons.webContents.on("paint", (event, dirty, image) => {
  //   if (tray) tray.setImage(image.resize({ width: 16, height: 16 }));
  // });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

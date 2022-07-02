const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, globalShortcut } = require("electron");
const path = require("path");

let openDevTools = false;
let tray;
let mainWindow;
let appJustOpened = true;

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
  }
  return mainWindow;
}

const setUpTrayAndContextMenu = function () {
  const iconPath = path.resolve(__dirname, "focus.png");
  const icon = nativeImage.createFromPath(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show/Hide Intention Window",
      accelerator: "control+`",
      click: async () => {
        toggleWindow();
      },
    },
    { type: "separator" },
    { role: "about" },
    { role: "quit" },
  ]);

  traySetup = new Tray(icon);
  traySetup.setTitle("");
  traySetup.setContextMenu(contextMenu);

  return traySetup;
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
    if (process.platform == "darwin") app.hide();
  } else {
    mainWindow.show();
  }
};

app.whenReady().then(function () {
  mainWindow = createWindow();
  tray = setUpTrayAndContextMenu();

  function handleSetTitle(event, title) {
    tray.setTitle(` ${title}`);
  }

  globalShortcut.register("Control+`", () => {
    toggleWindow();
  });

  ipcMain.on("set-title", handleSetTitle);
  ipcMain.on("toggle-window", toggleWindow);
  app.dock.hide();

  mainWindow.on("blur", (ev) => {
    if (appJustOpened) {
      return;
    } else {
      appJustOpened = false;
      ev.sender.webContents.send("app-blurred");
      ev.sender.hide();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

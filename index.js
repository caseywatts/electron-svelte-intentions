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
  const iconPath = path.resolve(__dirname, "focus.png");
  const icon = nativeImage.createFromPath(iconPath);
  traySetup = new Tray(icon);

  traySetup.setTitle("");
  // traySetup.setToolTip("lol tooltip");
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
  // Menu.setApplicationMenu(menu);
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "Item1", type: "radio" },
  //   { label: "Item2", type: "radio" },
  //   { label: "Item3", type: "radio", checked: true },
  //   { label: "Item4", type: "radio" },
  // ]);
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
    // const webContents = event.sender;
    // const win = BrowserWindow.fromWebContents(webContents);
    // win.setTitle(title);
    tray.setTitle(` ${title}`);
  }

  // tray.on("click", toggleWindow);

  globalShortcut.register("Control+`", () => {
    toggleWindow();
  });

  ipcMain.on("set-title", handleSetTitle);
  ipcMain.on("toggle-window", toggleWindow);
  app.dock.hide();
  // mainWindow.on("close", (ev) => {
  // ev.sender.hide();
  // if (ev.sender.isVisible()) {
  //   ev.sender.hide();
  //   // ev.preventDefault(); // prevent quit process
  // } else {
  //   // let it fully quit
  // }
  // });
  mainWindow.on("blur", (ev) => {
    // when app is blurred away, save the tile then clear it to be ready next time
    // ev.sender.webContents.executeJavaScript("setTitleAndHideWindow()").then(() => {
    ev.sender.hide();
    // });
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

  // mainWindow.on("show", () => {
  //   mainWindow.webContents.executeJavaScript("resetItPls()");
  // });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

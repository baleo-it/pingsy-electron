// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, } = require('electron')
const TraySystem = require('./libs/tray')

const url = require('url')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Initialize Tray
  TraySystem.init()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    transparent: true,
    show: false,
    frame: false,
    resizable: true,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  const startURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  })

  mainWindow.loadURL(startURL)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.on('action', (evt, ...args) => {
    console.log('action', args)

    if (args[0] === 'update-tray') {
      const items = JSON.parse(args[1])
      console.log('items to update', items)
      TraySystem.update(items)
      evt.sender.send('message', 'Tray updated!')
    } else {
      evt.sender.send('message', `Arg: ${args.toString()}`, JSON.stringify(args))
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const path = require('path')



const Menu = electron.Menu
function createWindow() {
    Menu.setApplicationMenu(null)
    // Create the browser window.
    const mainWindow = new BrowserWindow({

        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.webContents.session.webRequest.onBeforeRequest(null, (details, callback) => {
        setTimeout(() => {
            mainWindow.console.log(details.url)
            debugger
        }, 2000)

        

        callback({ cancel: false, redirectURL: details.url });
    })

    mainWindow.webContents.session.webRequest.onErrorOccurred(null, (e) => {
        console.log(e)
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./index.html') 

    const debug = (process.argv.indexOf("__debug" >= 0))
    // Open the DevTools.
    if (debug) {
        // mainWindow.webContents.openDevTools()
    }


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process

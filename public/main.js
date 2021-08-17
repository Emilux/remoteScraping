const { app, BrowserWindow,ipcMain  } = require('electron')

require('@electron/remote/main').initialize()
const isDev = require('electron-is-dev')
const path = require("path");
const url = require("url");
function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false,
            enableRemoteModule: true,
            webviewTag:true
        }
    })
    let express = require('express');
    let route = express();
    route.use(express.static(app.getPath('temp')+'/webpage'));
    let server = route.listen(8080, function () {
        console.log('Express server listening on port ' + server.address().port);
    });
    const pathHome = url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true,
    })
    console.log(pathHome)
    win.loadURL(isDev ?
        'http://localhost:3000':
        pathHome
    );
}



app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
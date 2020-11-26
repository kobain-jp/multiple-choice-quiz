https://www.electronjs.org/docs/tutorial/quick-start

## install from existed package.json

`npm install`

## install electron

`npm i --save-dev electron`

## create main.js

```
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
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

```

### edit package.json

```

{
  "name": "mcquiz-vue",
  "version": "1.0.0",
  "description": "",
U "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "start":"electron ."
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^11.0.3",
    "eslint": "^7.14.0",
    "eslint-plugin-vue": "^7.1.0",
    "prettier": "2.2.0",
    "webpack": "5.7.0",
    "webpack-cli": "^4.2.0"
  }
}


```

## start app

`npm start`

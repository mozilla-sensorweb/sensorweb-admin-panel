# SensorWeb admin panel
[![License](https://img.shields.io/badge/license-MPL2-blue.svg)](https://raw.githubusercontent.com/fxbox/foxbox/master/LICENSE)

Admin panel for [Project SensorWeb server](https://github.com/mozilla-sensorweb/sensorweb-server)

# Usage
This app expects that SensorWeb server runs on http://localhost:8080. If you want to run the server in other location, change the `proxy` value inside `package.json`.

Before running the app, you will need to install all its dependencies via

```shell
npm install
```

Once all dependencies are installed, simply run

```shell
npm start
```

You browser should automatically open a tab at http://localhost:3000

## Running UI tests

```shell
mocha tests/selenium/*
```
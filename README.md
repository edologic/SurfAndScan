SurfAndScan
===============


Overview and Client
------------

[![Edologic Logo](https://www.edologic.de/demo/edologic.png)](https://www.edologic.de/)

  SurfAndScan is a Framework that allow you to use scan devices from the browser.
  A minimalist web framework for [node](http://nodejs.org), [vue](https://vuejs.org/) and every other javascript project.
  The Framework handles the API from the surfAndScan Client.
  
### Simple test
Simplest way to test SurfAndScan is to download and install the [SurfAndScan driver](https://www.edologic.de/demo/sas/SurfAndScanInstallerV2_01.zip) and open the swagger documentation here. 
  [Try swagger documentation](https://edologic.github.io/SurfAndScan/swagger.html).

### Install SurfAndScanClient (For Windows or MacOS)

 On Windows you need to install the [windows setup](https://www.edologic.de/demo/sas/SurfAndScanInstallerV2_00.zip).
 Extract the zip and double click the installer file.
 
 On MacOs you need to install the dmg setup. Not available yet. Try again later.

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][downloads-url]
  [![Mac Build][appmac-image]][downloads-url]
  [![Windows Build][appveyor-image]][downloads-url]

####At first import the framework

```js
import sas from 'surfandscan'
```

####How to check SurfAndScan is installed on host
The request starts with
```js
var onSuccess = function(data) {
  console.log('sas is installed');
};
var onError = function(xhr, status, error) {
  console.log('sas is not running or not installed. Please download');
};
sas.checkIsAvailable(onSuccess, onError)


####How to get the available scan devices
The request starts with
```js
var onSuccess = function(data) {
  console.log(data);
};
var onError = function(xhr, status, error) {
  console.error(xhr, status, error);
};
sas.getDevices(onSuccess, onError)
```

The response in onSuccess
```js
[
  {
    "id": "d_ICA_Dell C2665dnf Color MFP",
    "name": "Dell C2665dnf Color MFP",
    "type": "ICA"
  }
]]
```

####How to start the scan process
The request starts with
```js
var onSuccess = function(data) {
  console.log(data);
};
var onError = function(xhr, status, error) {
  console.error(xhr, status, error);
};
var parameter = {
  duplex:false,
  feederUnit: 0,
  deviceAddress: 'd_ICA_Dell C2665dnf Color MFP'
}
sas.scan(onSuccess, onError, parameter)
```

The response in onSuccess with actual scan status informations 
```js
{
  "id": "task3441595979362720.992698398762",
  "status": "starting",
  "files": [],
  "pageNo": 0,
  "progress": 0,
  "success": true,
  "message": "",
  "feederUnit": 0,
  "messageCode": 0
}
```

####How to get scan process status information
The request starts with
```js
var onSuccess = function(data) {
  console.log(data);
};
var onError = function(xhr, status, error) {
  console.error(xhr, status, error);
};
var taskId = "task3441595979362720.992698398762"
sas.getTaskStatus(taskId, onSuccess, onError, parameter)
```

The response in onSuccess with actual scan status information
'status' is set to 'done' when done. 
You get a list of file ids.
```js
{
  "id": "task3441595979362720.992698398762",
  "status": "done",
  "files": [
    {
      "id": "file584650585869633184.6413714743682",
      "name": "img_0.jpg"
    },
    {
      "id": "file58465239210551744.710738804383254",
      "name": "img_1.jpg"
    },
    {
      "id": "file584654120563940876.8503452494729",
      "name": "img_2.jpg"
    }
  ],
  "pageNo": 3,
  "progress": 0,
  "success": true,
  "message": "Feeder is empty",
  "feederUnit": 0,
  "messageCode": 0
}
```

####How to download a scan task
```js
var taskId = "task3441595979362720.992698398762";
var filePattern = ""; // empty or an fileName 
var pageOrder = null; // or an array with reordered ids like ["file584654120563940876.8503452494729", "file58465239210551744.710738804383254", "file584650585869633184.6413714743682"]
sas.downloadTaskAsPDF(taskId, filePattern, pageOrder)
```

####How to delete one page from scan task
Simply user the pageOrder parameter and dismiss on id.

## I want to test without programming
No problem, install the surfAndScan client and open this [demo-site](https://www.edologic.de/demo/sas/#/FrameworkTest) 
## Installation

This is a javascript module available through the [npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install surfandscan
```

Follow [our installing guide](https://www.edologic.de/demo/sas/#/Framework)
for more information or use the [demo-site](https://www.edologic.de/demo/sas/#/FrameworkTest)


## Features

  * Cross-Browser Support: Chrome, Edge, Firefox and IE
  * Focus on high performance
  * Easy implementation
  * Integrate To Pages Within An Hour
  * Fast Flatbed And ADF Scanning
  * Generates Thumbnails & Upload To Web Servers Directly
  * Multiple output formats: PDF, TIFF, JPEG

## Docs & Community

  * [Website and Documentation](https://www.edologic.de) - [[website repo](https://github.com/edologic/SurfAndScan)]
  * [GitHub Organization](https://github.com/edologic) for Official Middleware & Modules
  * [Google Group](https://groups.google.com/d/forum/surfandscan) for discussion


## Quick Start

  The quickest way to get started with SurfAndScan is to open the website [`FrameworkTest`](https://www.edologic.de/demo/sas/#/FrameworkTest).

  Install the executable. [SurfAndScanInstaller.exe](https://www.edologic.de/demo/sas/SurfAndScanInstallerV2_00.zip)


## Philosophy

  The SurfAndScan philosophy is to provide small, robust tooling for HTTPS servers, making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs. It allows you to enable every https site to connect with an scan device. Twain, ICA, WIA, .. 

## People

The original author of ScanAndSurf is [mebel MatthiasEbel](https://github.com/mebel)


## License

  [MIT](LICENSE)

[windows-download-url]: https://www.edologic.de/demo/sas/SurfAndScanInstallerV2_00.zip
[npm-image]: https://img.shields.io/npm/v/surfandscan.svg
[npm-url]: https://www.npmjs.com/package/surfandscan
[downloads-image]: https://img.shields.io/npm/dm/surfandscan.svg
[downloads-url]: https://www.npmjs.com/package/surfandscan
[travis-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=linux
[appveyor-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=windows
[appmac-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=macos

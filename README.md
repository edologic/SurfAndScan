SurfAndScan
===============


Overview and Client
------------

[![Edologic Logo](https://www.edologic.de/demo/edologic.png)](https://www.edologic.de/)

  SurfAndScan is a Framework that allow you to use scan devices from the browser.
  A minimalist web framework for [node](http://nodejs.org), [vue](https://vuejs.org/) and every other javascript project.
  The Framework handles the API from the surfAndScan Client. 

Install SurfAndScanClient (For Windows or MacOS)

 On Windows you need to install the [windows setup](http://www.edologic.de/demo/SurfAndScanInstaller.zip).
 Extract the zip and double click the installer file.
 
 On MacOs you need to install the dmg setup. Not available yet. Try again later.

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][downloads-url]
  [![Mac Build][appmac-image]][downloads-url]
  [![Windows Build][appveyor-image]][downloads-url]

```js
import sas from 'surfandscan'
sas.getDevices(this.onGetDevices)
sas.scan(this.onGetScanStatus)
sas.downloadTaskAsPDF('taskId')
```
## Installation

This is a javascript module available through the [npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install surfandscan
```

Follow [our installing guide](https://www.edologic.de/demo/sas/#/Framework)
for more information.


## Features

  * Cross-Browser Support: Chrome, Edge, Firefox and IE
  * Focus on high performance
  * Easy implementation
  * Integrate To Pages Within An Hour
  * Fast Flatbed And ADF Scanning
  * Generates Thumbnails & Upload To Web Servers Directly
  * Multiple output formats: PDF, TIFF

## Docs & Community

  * [Website and Documentation](https://www.edologic.de) - [[website repo](https://github.com/edologic/SurfAndScan)]
  * [GitHub Organization](https://github.com/edologic) for Official Middleware & Modules
  * [Google Group](https://groups.google.com/d/forum/surfandscan) for discussion


## Quick Start

  The quickest way to get started with ScanAndSurf is to utilize the executable [`FrameworkTest`](https://www.edologic.de/demo/sas/#/FrameworkTest):

  Install the executable. SurfAndScanInstaller.exe


## Philosophy

  The ScanAndSurf philosophy is to provide small, robust tooling for HTTP servers, making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs. It allows you to enable every http site to connect with an scan device. Twain, ICA, WIA, .. 

## People

The original author of ScanAndSurf is [mebel MatthiasEbel](https://github.com/mebel)


## License

  [MIT](LICENSE)

[windows-download-url]: http://www.edologic.de/demo/SurfAndScanInstallerV1_90.zip
[npm-image]: https://img.shields.io/npm/v/surfandscan.svg
[npm-url]: https://www.npmjs.com/package/surfandscan
[downloads-image]: https://img.shields.io/npm/dm/surfandscan.svg
[downloads-url]: https://www.npmjs.com/package/surfandscan
[travis-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=linux
[appveyor-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=windows
[appmac-image]: https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?label=macos
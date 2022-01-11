import axios from 'axios'

const $ = {}

const sas = {
  init () {
    this.gbl_host = 'https://localhost.surfandscan.com:8000'
    this.gbl_version = '1.2.0'
    this.token = ''
    this.apiHeader = {}
  },
  /**
   * Set the host of the surfAndScan client. Default is 'https://localhost.surfandscan.com:8000'
   * @param hostName name of the host
   */
  setHost (hostName) {
    this.gbl_host = hostName
  },

  getHost () {
    return this.gbl_host
  },
  /**
   * Returns the version of this api
   * @returns {string} version like '1.0.0'
   */
  getVersion () {
    return this.gbl_version
  },

  showIdle (showIdle) {
    console.log('showIdle - you could override this feature', showIdle)
  },

  /**
   * Set the config of the surfAndScan client
   * @param config
   * @param fnSuccess
   * @param fnError
   */
  setConfig (config, fnSuccess, fnError) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    $.ajax({
      url: this.gbl_host + '/config?' + urlAppend,
      type: 'POST',
      data: JSON.stringify(config),
      contentType: 'application/json; charset=utf-8;',
      async: false,
      crossDomain: true,
      headers: this.apiHeader,
      success: function (data) {
        fnSuccess(data)
      },
      error: function (xhr, status, error) {
        if (fnError) {
          fnError(xhr, status, error)
        } else {
          console.log('error')
          console.log(xhr)
          console.log(status)
          console.log(error)
        }
      }
    })
  },

  getFullURL (path) {
    return this.gbl_host + '/api/v1' + path
  },
  /**
   * Check the host that the surfAndScan Process is installed and running
   * @param fnSuccess
   * @param fnFailed
   */
  checkIsAvailable (fnSuccess, fnFailed) {
    const cmp = this
    const params = {
      time: new Date().getTime(),
      token: cmp.token
    }
    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      url: cmp.getFullURL('/version'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
        cmp.showIdle(false)
        if (fnFailed) {
          fnFailed(error)
        }
      })
  },

  /**
   * Retrieves the configuration from the surfAndScan client.
   * @param fnSucess
   * @param fnError
   */
  getConfig (fnSuccess, fnError) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    $.ajax({
      url: this.gbl_host + '/config?' + urlAppend,
      type: 'GET',
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8;',
      async: false,
      crossDomain: true,
      headers: this.apiHeader,
      success: function (data) {
        fnSuccess(data)
      },
      error: function (xhr, status, error) {
        if (fnError) {
          fnError(xhr, status, error)
        } else {
          console.log('error')
          console.log(xhr)
          console.log(status)
          console.log(error)
        }
      }
    })
  },
  /**
   * Retrieves a list of available scan devices. Twain devices only listed when the configuration set twain enabled
   * @param fnSucess
   * @param fnError
   */
  getDevices (fnSuccess, fnFailed) {
    const cmp = this
    const params = {
      time: new Date().getTime(),
      token: cmp.token
    }
    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      url: cmp.getFullURL('/devices/list'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
        cmp.showIdle(false)
        if (fnFailed) {
          fnFailed(error)
        }
      })
  },

  /**
   * Returns a list of sas clients from the same network
   * @param fnSuccess
   * @param fnError
   */
  getClients (fnSuccess, fnError) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    $.ajax({
      url: this.gbl_host + '/v1/clients/list?' + urlAppend,
      type: 'GET',
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8;',
      async: false,
      crossDomain: true,
      headers: this.apiHeader,
      success: function (data) {
        fnSuccess(data)
      },
      error: function (xhr, status, error) {
        if (fnError) {
          fnError(xhr, status, error)
        } else {
          console.log('error')
          console.log(xhr)
          console.log(status)
          console.log(error)
        }
      }
    })
  },
  /**
   * Returns a valid thumbail url from the given parameter
   * @param fileId
   * @param taskId
   * @returns {string}
   */
  getThumbnailUrl (fileId, taskId) {
    const time = 0
    const urlAppend = 'time=' + time + '&token=' + this.token
    const url = this.gbl_host + '/scantask/download?fileId=' + fileId + '&taskId=' + taskId + '&' + urlAppend
    return url
  },

  /**
   * Downloads the file from the given parameter
   * @param fileId
   * @param taskId
   */
  download (fileId, taskId) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token

    function downloadURI (uri, name) {
      var link = document.createElement('a')
      link.download = name
      link.href = uri
      link.click()
    }

    var url = this.gbl_host + '/scantask/download?taskId=' + taskId + '&fileId=' + fileId + '&' + urlAppend
    console.log(url)
    downloadURI(url, fileId + '.jpg')
  },

  /**
   * Returns a download url as string for given file id and task id
   * @param fileId
   * @param taskId
   * @returns {string}
   */
  getDownloadUrl (fileId, taskId) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    const url = this.gbl_host + '/scantask/download?taskId=' + taskId + '&fileId=' + fileId + '&' + urlAppend
    return url
  },
  /**
   * Returns a upload url as string
   * @returns {string}
   */
  getStorageUploadUrl () {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    const url = this.gbl_host + '/storage/upload?' + urlAppend
    return url
  },

  /**
   *
   * @param taskId id of the task
   * @param name Name of the storage model
   * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
   * @param categories list of category guids 0815, 0817, 099, ...
   * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
   * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
   * @param fnSuccess callback on success
   * @param fnError callback on failed
   */
  saveTaskToStorage (taskId, name, filePattern, categories, pageOrder, rotateArr, fnSuccess, fnError) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    const url = this.gbl_host + '/scantask/saveToStorage?' + urlAppend
    $.ajax({
      url: url,
      data: {
        name: name,
        scanTaskId: taskId,
        filePattern: filePattern,
        categories: categories,
        pageOrder: pageOrder,
        rotateArr: rotateArr
      },
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8;',
      async: false,
      crossDomain: true,
      type: 'POST',

      headers: this.apiHeader,
      success: function (data) {
        fnSuccess(data)
      },
      error: function (jqXHR, textStatus, ex) {
        if (fnError) {
          fnError(jqXHR, textStatus, ex)
        } else {
          console.log('error')
          console.log(jqXHR)
          console.log(textStatus)
          console.log(ex)
        }
      }
    })
  },

  /**
   * Creates a download url PDF from the given task.
   * @param taskId id of the task
   * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
   * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
   * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
   * @returns {string} url
   */
  getDownloadTaskAsPDFURL (taskId, filePattern, pageOrder, rotateArr) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token
    let url = this.gbl_host + '/scantask/downloadAsPDF?scanTaskId=' + taskId + '&filePattern=' + filePattern + '&' + urlAppend
    if (pageOrder) {
      url = url + '&pageOrder=' + JSON.stringify(pageOrder)
    }
    if (rotateArr) {
      url = url + '&rotateArr=' + JSON.stringify(rotateArr)
    }
    return url
  },

  /**
   * Creates a PDF from the given task and starts the download directly.
   * @param taskId id of the task
   * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
   * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
   * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
   * @returns nothing
   */
  downloadTaskAsPDF (taskId, filePattern, pageOrder, rotateArr) {
    function downloadURI (uri, name) {
      var link = document.createElement('a')
      link.download = name
      link.href = uri
      link.target = '_new'
      link.click()
    }

    var url = this.getDownloadTaskAsPDFURL(taskId, filePattern, pageOrder, rotateArr)

    downloadURI(url, taskId + '.pdf')
  },

  /**
   * Creates a Tiff from the given task and starts the download directly.
   * @param taskId id of the task
   * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
   * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
   * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
   */
  downloadTaskAsTIFF (taskId, filePattern, pageOrder, rotateArr) {
    const time = new Date().getTime()
    const urlAppend = 'time=' + time + '&token=' + this.token

    function downloadURI (uri, name) {
      var link = document.createElement('a')
      link.download = name
      link.href = uri
      link.target = '_new'
      link.click()
    }

    var url = this.gbl_host + '/scantask/downloadAsTIFF?scanTaskId=' + taskId + '&filePattern=' + filePattern + '&' + urlAppend
    if (pageOrder) {
      url = url + '&pageOrder=' + JSON.stringify(pageOrder)
    }
    if (rotateArr) {
      url = url + '&rotateArr=' + JSON.stringify(rotateArr)
    }
    console.log(url)
    downloadURI(url, taskId + '.pdf')
  },

  getHeader () {
    return {}
  },

  getDemoUploadURL () {
    return this.getFullURL('/demo/upload')
  },
  getDemoDownloadURL () {
    return this.getFullURL('/demo/download')
  },
  getDemoEditableDownloadURL () {
    return this.getFullURL('/demo/downloadEditable')
  },

  /**
   *
   * @param parameter
   * @param headers
   * @param fnSuccess
   * @param fnError
   */
  uploadTaskToDestination (parameter, headers, fnSuccess, fnError) {
    const cmp = this
    const reqHeader = this.getHeader()
    let params = {
      time: new Date().getTime(),
      token: cmp.token,
      taskId: parameter.taskId
    }
    if (parameter) {
      params = { ...params, ...parameter }
    }
    if (headers) {
      params.targetHeader = btoa(JSON.stringify(headers))
    }
    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      headers: reqHeader,
      url: cmp.getFullURL('/scantask/upload'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
        cmp.showIdle(false)
        if (fnError) {
          fnError(error)
        }
      })
  },
  downEditAndUpFile (parameter, fnSuccess, fnError) {
    const cmp = this
    const reqHeader = this.getHeader()
    let params = {
      time: new Date().getTime(),
      token: cmp.token
    }
    if (parameter) {
      params = { ...params, ...parameter }
    }
    if (parameter.headerDownload) {
      params.headerDownload = btoa(JSON.stringify(parameter.headerDownload))
    }
    if (parameter.headersUpload) {
      params.headersUpload = btoa(JSON.stringify(parameter.headersUpload))
    }
    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      headers: reqHeader,
      url: cmp.getFullURL('/edittask/start'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
      cmp.showIdle(false)
      if (fnError) {
        fnError(error)
      }
    })
  },
  /**
   * Returns the status informations for the given task
   * @param taskId
   * @param fnSuccess
   * @param fnError
   */
  getTaskStatus (taskId, fnSuccess, fnError) {
    const cmp = this
    const params = {
      time: new Date().getTime(),
      token: cmp.token,
      taskId: taskId
    }
    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      url: cmp.getFullURL('/scantask/status'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
        cmp.showIdle(false)
        if (fnError) {
          fnError(error)
        }
      })
  },
  /**
   * Start the scan with parameter
   * @param parameter
   * @param fnSuccess
   * @param fnError
   */
  scan (parameter, fnSuccess, fnError) {
    const cmp = this
    let params = {
      time: new Date().getTime(),
      token: cmp.token
    }

    if (parameter) {
      params = { ...params, ...parameter }
    }

    cmp.showIdle(true)
    axios({
      method: 'get',
      params: params,
      url: cmp.getFullURL('/scan'),
      responseType: 'json'
    })
      .then(function (response) {
        if (fnSuccess) {
          fnSuccess(response.data)
        }
      }).catch(error => {
        cmp.showIdle(false)
        if (fnError) {
          fnError(error)
        }
      })
  }
}

if (typeof window !== 'undefined') {
  window.sas = sas
}
sas.init()

export default sas

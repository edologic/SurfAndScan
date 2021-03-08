exports.gbl_host = "https://localhost.surfandscan.com:8000"
exports.token = ""
exports.apiHeader = {}

/**
 * Set the host of the surfAndScan client. Default is "https://localhost.restservice.cloud:8000"
 * @param hostName name of the host
 */
exports.setHost = function (hostName) {
    exports.gbl_host = hostName
}
/**
 * Set the config of the surfAndScan client
 * @param config
 * @param fnSuccess
 * @param fnError
 */
exports.setConfig = function (config, fnSuccess, fnError ) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    $.ajax({
        url: this.gbl_host + "/config?" + urlAppend,
        type: 'POST',
        data: JSON.stringify(config),
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function (xhr, status, error) {
            if (fnError) {
                fnError(xhr, status, error);
            } else {
                console.log("error");
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
/**
 * Check the host that the surfAndScan Process is installed and running
 * @param fnSuccess
 * @param fnFailed
 */
exports.checkIsAvailable = function (fnSuccess, fnFailed) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    $.ajax({
        url: this.gbl_host + "/version?" + urlAppend,
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function(xhr, status, error) {
            if (fnFailed) {
                fnFailed(xhr, status, error);
            } else {
                console.log("error");
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
/**
 * Retrieves the configuration from the surfAndScan client.
 * @param fnSucess
 * @param fnError
 */
exports.getConfig = function (fnSuccess, fnError ) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    $.ajax({
        url: this.gbl_host + "/config?" + urlAppend,
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function(xhr, status, error) {
            if (fnError) {
                fnError(xhr, status, error);
            } else {
                console.log("error");
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
/**
 * Retrieves a list of available scan devices. Twain devices only listed when the configuration set twain enabled
 * @param fnSucess
 * @param fnError
 */
exports.getDevices = function (fnSuccess, fnError ) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;

    $.ajax({
        url: this.gbl_host + "/devices/list?" + urlAppend,
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function(xhr, status, error) {
            if (fnError) {
                fnError(xhr, status, error);
            } else {
                console.log("error");
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}

/**
 * Returns a list of sas clients from the same network
 * @param fnSuccess
 * @param fnError
 */
exports.getClients = function (fnSuccess, fnError ) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    $.ajax({
        url: this.gbl_host + "/v1/clients/list?" + urlAppend,
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function(xhr, status, error) {
            if (fnError) {
                fnError(xhr, status, error);
            } else {
                console.log("error");
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
/**
 * Returns a valid thumbail url from the given parameter
 * @param fileId
 * @param taskId
 * @returns {string}
 */
exports.getThumbnailUrl = function (fileId,taskId) {
    let time = 0;
    let urlAppend = "time=" + time + "&token=" + this.token;
    var url = this.gbl_host + "/scantask/download?fileId=" + fileId + "&taskId=" + taskId + "&" + urlAppend;
    return url;
}

/**
 * Downloads the file from the given parameter
 * @param fileId
 * @param taskId
 */
exports.download = function (fileId, taskId) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }
    var url = this.gbl_host + "/scantask/download?taskId=" + taskId + "&fileId=" + fileId + "&" + urlAppend;
    console.log(url);
    downloadURI(url, fileId +".jpg");
}

/**
 * Returns a download url as string for given file id and task id
 * @param fileId
 * @param taskId
 * @returns {string}
 */
exports.getDownloadUrl= function (fileId, taskId) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    var url = this.gbl_host + "/scantask/download?taskId=" + taskId + "&fileId=" + fileId + "&" + urlAppend;
    return url;
}
/**
 * Returns a upload url as string
 * @returns {string}
 */
exports.getStorageUploadUrl= function () {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    var url = this.gbl_host + "/storage/upload?" + urlAppend;
    return url;
}


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
exports.saveTaskToStorage = function (taskId, name, filePattern, categories, pageOrder, rotateArr, fnSuccess, fnError) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    var url = this.gbl_host + "/scantask/saveToStorage?" + urlAppend;
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
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        type: 'POST',

        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function (jqXHR, textStatus, ex) {
            if (fnError) {
                fnError(jqXHR, textStatus, ex);
            } else {
                console.log("error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(ex);
            }
        }
    });
}

/**
 * Creates a download url PDF from the given task.
 * @param taskId id of the task
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
 * @returns {string} url
 */
exports.getDownloadTaskAsPDFURL = function (taskId, filePattern, pageOrder, rotateArr) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    var url = this.gbl_host + "/scantask/downloadAsPDF?scanTaskId=" + taskId + "&filePattern=" + filePattern + "&" + urlAppend;
    if (pageOrder) {
        url = url + "&pageOrder=" + JSON.stringify(pageOrder);
    }
    if (rotateArr) {
        url = url + "&rotateArr=" + JSON.stringify(rotateArr);
    }
    return url;
}

/**
 * Creates a PDF from the given task and starts the download directly.
 * @param taskId id of the task
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
 * @returns nothing
 */
exports.downloadTaskAsPDF = function (taskId, filePattern, pageOrder, rotateArr) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }
    var url = this.getDownloadTaskAsPDFURL(taskId, filePattern, pageOrder, rotateArr)

    downloadURI(url, taskId +".pdf");
}

/**
 * Creates a Tiff from the given task and starts the download directly.
 * @param taskId id of the task
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 * @param rotateArr could be null or an array like [45, 90, 0] numbers represents the degree to rotate a image
 */
exports.downloadTaskAsTIFF = function (taskId, filePattern, pageOrder, rotateArr) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }
    var url = this.gbl_host + "/scantask/downloadAsTIFF?scanTaskId=" + taskId + "&filePattern="+filePattern+"&"+urlAppend;
    if (pageOrder) {
        url = url + "&pageOrder=" + JSON.stringify(pageOrder);
    }
    if (rotateArr) {
        url = url + "&rotateArr=" + JSON.stringify(rotateArr);
    }
    console.log(url);
    downloadURI(url, taskId +".pdf");
}
/**
 *
 * @param paramsAsUrl
 * @param headers
 * @param fnSuccess
 * @param fnError
 */
exports.uploadTaskToDestination = function (params,headers,fnSuccess, fnError) {
    let time = new Date().getTime();
    let urlAppend = "time=" + time + "&token=" + this.token;
    var aHeaders = headers;
    $.ajax({
        url: this.gbl_host + "/scantask/upload?" + urlAppend,
        type: 'GET',
        data:params,
        beforeSend: function(request) {
            for (var property in aHeaders) {
                if (aHeaders.hasOwnProperty(property)) {
                    console.log(property+" -- " + aHeaders[property]);
                    request.setRequestHeader(property, aHeaders[property]);
                }
            }

        },
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,

        success: function (data) {
            fnSuccess(data);
        },
        error: function (jqXHR, textStatus, ex) {
            if (fnError) {
                fnError(jqXHR, textStatus, ex);
            } else {
                console.log("error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(ex);
            }
        }
    });
}
/**
 * Returns the status informations for the given task
 * @param taskId
 * @param fnSuccess
 * @param fnError
 */
exports.getTaskStatus = function (taskId, fnSuccess, fnError) {
    var urlAppend = "time=" + new Date().getTime() + "&token=" + this.token;
    $.ajax({
        url: this.gbl_host + "/scantask/status?" + urlAppend,
        data: {
            taskId: taskId

        },
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        type: 'GET',

        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function (jqXHR, textStatus, ex) {
            if (fnError) {
                fnError(jqXHR, textStatus, ex);
            } else {
                console.log("error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(ex);
            }
        }
    });
}
/**
 * Start the scan with parameter
 * @param parameter
 * @param fnSuccess
 * @param fnError
 */
exports.scan = function (parameter, fnSuccess, fnError) {
    var urlAppend = "time=" + new Date().getTime() + "&token=" + this.token;
    var scanIndex = 0;
    $.ajax({
        url: this.gbl_host + "/scan?" + urlAppend,
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        data: parameter,
        type: 'GET',
        headers: this.apiHeader,
        success: function (data) {
            fnSuccess(data);
        },
        error: function (jqXHR, textStatus, ex) {
            if (fnError) {
                fnError(jqXHR, textStatus, ex);
            } else {
                console.log("error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(ex);
            }
        }
    });
}

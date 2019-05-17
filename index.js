exports.gbl_host = "https://localhost.restservice.cloud:8000"
exports.apiHeader = {}
/**
 * Set the config of the surfAndScan client
 * @param config
 * @param fnSucess
 * @param fnError
 */
exports.setConfig = function (config, fnSuccess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/config",
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
 * Retrieves the configuration from the surfAndScan client.
 * @param fnSucess
 * @param fnError
 */
exports.getConfig = function (fnSuccess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/config",
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
    $.ajax({
        url: this.gbl_host + "/devices/list",
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
    var url = this.gbl_host + "/scantask/download?fileId=" + fileId + "&taskId=" + taskId;
    return url;
}

/**
 * Downloads the file from the given parameter
 * @param fileId
 * @param taskId
 */
exports.download = function (fileId, taskId) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }
    var url = this.gbl_host + "/scantask/download?taskId=" + taskId + "&fileId=" + fileId;
    console.log(url);
    downloadURI(url, fileId +".jpg");
}

/**
 *
 * @param taskId id of the task
 * @param name Name of the storage model
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param categories list of category guids 0815, 0817, 099, ...
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 * @param fnSuccess callback on success
 * @param fnError callback on failed
 */
exports.saveTaskToStorage = function (taskId, name, filePattern, categories, pageOrder, fnSuccess, fnError) {
    var url = this.gbl_host + "/scantask/saveToStorage";
    $.ajax({
        url: url,
        data: {
            name: name,
            scanTaskId: taskId,
            filePattern: filePattern,
            categories: categories,
            pageOrder: pageOrder
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
                fnError(xhr, status, error);
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
 * Creates a PDF from the given task and starts the download directly.
 * @param taskId id of the task
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 */
exports.downloadTaskAsPDF = function (taskId, filePattern, pageOrder) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }

    var url = this.gbl_host + "/scantask/downloadAsPDF?scanTaskId=" + taskId + "&filePattern="+filePattern;
    if (pageOrder) {
        url = url + "&pageOrder=" + JSON.stringify(pageOrder);
    }
    console.log(url);
    downloadURI(url, taskId +".pdf");
}

/**
 * Creates a Tiff from the given task and starts the download directly.
 * @param taskId id of the task
 * @param filePattern Should be an valid fileName or empty. Valid fileName that we could write it to the hard disc. (no path)
 * @param pageOrder could be null or an array like [2, 1, 0] backwards sorted scans
 */
exports.downloadTaskAsTIFF = function (taskId, filePattern, pageOrder) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }
    var url = this.gbl_host + "/scantask/downloadAsTIFF?scanTaskId=" + taskId + "&filePattern="+filePattern;
    if (pageOrder) {
        url = url + "&pageOrder=" + JSON.stringify(pageOrder);
    }
    console.log(url);
    downloadURI(url, taskId +".pdf");
}
/**
 * Delete the given category
 * @param guid of the category
 * @param fnSuccess
 * @param fnError
 */
exports.deleteStorageCategory = function (guid, fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "DELETE",
            type: "categories",
            guid: guid,
            name: ""
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
                fnError(xhr, status, error);
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
 * Request a search from the storage with given request data.
 * @param reqData
 * @param fnSuccess
 * @param fnError
 */
exports.searchStorage = function (reqData, fnSuccess, fnError) {
    reqData["method"] = "LIST";
    reqData["type"] = "files";
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: reqData,
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
                fnError(xhr, status, error);
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
 *
 * @param catObject
 * @param fnSuccess
 * @param fnError
 */
exports.addStorageItemCategory = function(catObject, fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "CREATE",
            type: "categories",
            name: catObject.name
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
                fnError(xhr, status, error);
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
 * Deletes a file from the storage by given file guid.
 * @param guid guid of the file
 * @param fnSuccess
 * @param fnError
 */
exports.deleteFileFromStorage = function(guid, fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "DELETE",
            type: "files",
            guid: guid
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
                fnError(xhr, status, error);
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
 *
 * @param guid
 * @param fileName
 */
exports.downloadStorageItem = function(guid, fileName) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }
    var url = this.gbl_host + "/storage/item?method=DOWNLOAD&type=files&guid=" + guid;
    console.log(url);
    downloadURI(url, fileName);
}
/**
 *
 * @param params
 * @param headers
 * @param fnSuccess
 * @param fnError
 */
exports.uploadTaskToDestination = function (params,headers,fnSuccess, fnError) {
    for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
            console.log(property+" -- " + headers[property]);
            params[property] = headers[property];
        }
    }

    $.ajax({
        url: this.gbl_host + "/scantask/upload",
        data: params,
        type: 'GET',

        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,

        success: function (data) {
            fnSuccess(data);
        },
        error: function (jqXHR, textStatus, ex) {
            if (fnError) {
                fnError(xhr, status, error);
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
 *
 * @param guid
 * @param time
 * @param categories
 * @param fnSuccess
 * @param fnError
 */
exports.updateStorageItem = function(guid, time, name, categories, fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "UPDATE",
            type: "categories",
            guid: guid,
            name: name,
            time: time,
            categories: categories.join()
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
                fnError(xhr, status, error);
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
 * Retrieves a list of categories
 * @param fnSuccess
 * @param fnError
 */
exports.getStorageCategories = function (fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "LIST",
            type: "categories",
            name: ""
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
                fnError(xhr, status, error);
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
    $.ajax({
        url: this.gbl_host + "/scantask/status",
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
                fnError(xhr, status, error);
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
    var scanIndex = 0;
    $.ajax({
        url: this.gbl_host + "/scan",
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
                fnError(xhr, status, error);
            } else {
                console.log("error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(ex);
            }
        }
    });
}

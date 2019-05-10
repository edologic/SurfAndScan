exports.gbl_host = "https://localhost.restservice.cloud:8000"
exports.apiHeader = {}
exports.getConfig = function (fnSucess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/config",
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSucess(data);
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

exports.getDevices = function (fnSucess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/devices/list",
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSucess(data);
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

exports.getThumbnailUrl = function (fileId,taskId) {
    var url = this.gbl_host + "/scantask/download?fileId=" + fileId + "&taskId=" + taskId;
    return url;
}

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

exports.saveTaskToStorage = function (taskId, filePattern, categories, fnSuccess, fnError) {
    var url = this.gbl_host + "/scantask/saveToStorage";
    $.ajax({
        url: url,
        data: {
            scanTaskId: taskId,
            filePattern: filePattern,
            categories: categories
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}

exports.downloadTaskAsPDF = function (taskId, filePattern) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }
    var url = this.gbl_host + "/scantask/downloadAsPDF?scanTaskId=" + taskId + "&filePattern="+filePattern;
    console.log(url);
    downloadURI(url, taskId +".pdf");
}

exports.downloadTaskAsTIFF = function (taskId, filePattern) {
    function downloadURI(uri, name)
    {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.target = "_new";
        link.click();
    }
    var url = this.gbl_host + "/scantask/downloadAsTIFF?scanTaskId=" + taskId + "&filePattern="+filePattern;
    console.log(url);
    downloadURI(url, taskId +".pdf");
}

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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
exports.downloadStorageItem = function(guid, fileName, fnSuccess, onFailed) {
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
exports.updateStorageItemCategories = function(guid, time, categories, fnSuccess, fnError) {
    $.ajax({
        url: this.gbl_host + "/storage/item",
        data: {
            method: "UPDATE",
            type: "categories",
            guid: guid,
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}

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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
exports.scan = function (fnSuccess, fnError, scanParameter) {
    var scanIndex = 0;
    $.ajax({
        url: this.gbl_host + "/scan",
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        data: scanParameter,
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
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        }
    });
}
exports.setConfig = function (config, fnSucess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/config",
        type: 'POST',
        data: JSON.stringify(config),
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain: true,
        headers: this.apiHeader,
        success: function (data) {
            fnSucess(data);
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
exports.getConfig = function (fnSucess, fnError ) {
    $.ajax({
        url: this.gbl_host + "/config",
        type: 'GET',
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8;",
        async: false,
        crossDomain:true,
        headers: this.apiHeader,
        success: function (data) {
            fnSucess(data);
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

var applicationSettingsModule = require("application-settings");
var constantsModule = require("./constants");
var notificationsModule = require("./notifications");
var everliveModule = require("../lib/everlive");
var TASK = "Task";
var Service = (function () {
    function Service() {
    }
    Object.defineProperty(Service.prototype, "isAuthenticated", {
        get: function () {
            return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password, function (data) {
                _this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.logout = function () {
        this.clearLocalSettings();
        this.clearEverlive();
    };
    Service.prototype.signUp = function (username, password, additionalData) {
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.currentUser().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.clearEverlive = function () {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    };
    Service.prototype.getTasks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).get().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createTask = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).create(task, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateTask = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).updateSingle(task, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteTask = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).destroySingle({ Id: task.Id }, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getDownloadUrlFromId = function (fileId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Files.getDownloadUrlById(fileId).then(function (url) {
                console.log("READY: " + url);
                resolve(url);
            }, function (error) {
                console.log("INNER ERROR: ");
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createEverlive = function () {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }
        return this._everlive;
    };
    Service.showErrorAndReject = function (error, reject) {
        notificationsModule.showError(error.message);
        reject(error);
    };
    Service.prototype.setupLocalSettings = function (authenticationTokenKey) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
    };
    Service.prototype.clearLocalSettings = function () {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
    };
    return Service;
})();
exports.Service = Service;
exports.service = new Service();
//# sourceMappingURL=service.js.map
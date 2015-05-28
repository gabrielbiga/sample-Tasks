var applicationSettingsModule = require("application-settings");
var constantsModule = require("./constants");
var notificationsModule = require("./notifications");
var everliveModule = require("../lib/everlive");
var TASK = "Task";
var DUE_DATE = "DueDate";
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
    Service.prototype.getOverdueTasks = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        return this.getTasksBefore(start);
    };
    Service.prototype.getTasksForToday = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 1);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksForTomorrow = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        start.setDate(start.getDate() + 1);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 2);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksAfterTomorrow = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + 2);
        return this.getTasksAfter(date);
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
    Service.prototype.getTasksBetween = function (start, end) {
        var query = new everliveModule.Query();
        query.where().and().gte(DUE_DATE, start).lt(DUE_DATE, end).done();
        return this.getTasks(query);
    };
    Service.prototype.getTasksBefore = function (date) {
        var query = new everliveModule.Query();
        query.where().lt(DUE_DATE, date);
        return this.getTasks(query);
    };
    Service.prototype.getTasksAfter = function (date) {
        var query = new everliveModule.Query();
        query.where().or().gte(DUE_DATE, date).eq(DUE_DATE, null).done();
        return this.getTasks(query);
    };
    Service.prototype.getTasks = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).get(query).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    return Service;
})();
exports.Service = Service;
exports.service = new Service();
//# sourceMappingURL=service.js.map
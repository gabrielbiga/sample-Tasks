var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var editTaskViewModelModule = require("../edit-task/edit-task-view-model");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var ViewTaskViewModel = (function (_super) {
    __extends(ViewTaskViewModel, _super);
    function ViewTaskViewModel(task) {
        _super.call(this);
        this.task = task;
        this.project = {
            Name: "To do"
        };
        this.pictureUrl = null;
    }
    Object.defineProperty(ViewTaskViewModel.prototype, "task", {
        get: function () {
            return this._task;
        },
        set: function (value) {
            if (this._task != value) {
                this._task = value;
                this.notifyPropertyChanged("task", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewTaskViewModel.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            if (this._project != value) {
                this._project = value;
                this.notifyPropertyChanged("project", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewTaskViewModel.prototype, "pictureUrl", {
        get: function () {
            return this._pictureUrl;
        },
        set: function (value) {
            if (this._pictureUrl !== value) {
                this._pictureUrl = value;
                this.notifyPropertyChanged("pictureUrl", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewTaskViewModel.prototype.loadPhoto = function () {
        var _this = this;
        if (this.task.Photo && !this.pictureUrl) {
            this.beginLoading();
            serviceModule.service.getDownloadUrlFromId(this.task.Photo).then(function (url) {
                _this.pictureUrl = url;
                _this.endLoading();
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    ViewTaskViewModel.prototype.editTask = function () {
        /*
        * This is how you pass and argument to the next page.
        * For more options pls visit the documentation article  - http://docs.nativescript.org/navigation#navigation
        */
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel(this.task)
        });
    };
    ViewTaskViewModel.prototype.deleteTask = function () {
    };
    ViewTaskViewModel.prototype.completeTask = function () {
        alert("This functionality will be implemented in the next version!");
    };
    return ViewTaskViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ViewTaskViewModel = ViewTaskViewModel;
//# sourceMappingURL=view-task-view-model.js.map
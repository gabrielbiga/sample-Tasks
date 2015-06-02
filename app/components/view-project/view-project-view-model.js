var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var viewTaskViewModelModule = require("../view-task/view-task-view-model");
var editTaskViewModelModule = require("../edit-task/edit-task-view-model");
var editProjectViewModelModule = require("../edit-project/edit-project-view-model");
var notificationsModule = require("../../utils/notifications");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var ViewProjectViewModel = (function (_super) {
    __extends(ViewProjectViewModel, _super);
    function ViewProjectViewModel(project) {
        _super.call(this);
        this.project = project;
        this.refresh();
    }
    Object.defineProperty(ViewProjectViewModel.prototype, "project", {
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
    Object.defineProperty(ViewProjectViewModel.prototype, "tasks", {
        get: function () {
            return this._tasks;
        },
        set: function (value) {
            if (this._tasks != value) {
                this._tasks = value;
                this.notifyPropertyChanged("tasks", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewProjectViewModel.prototype, "tasksCount", {
        get: function () {
            if (this.tasks) {
                return this.tasks.length;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    ViewProjectViewModel.prototype.editProject = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProject,
            context: new editProjectViewModelModule.EditProjectViewModel(this.project)
        });
    };
    ViewProjectViewModel.prototype.deleteProject = function () {
        var _this = this;
        notificationsModule.confirm("Delete Item", "Do you want to delete the item?").then(function (value) {
            if (value) {
                _this.beginLoading();
                serviceModule.service.deleteProject(_this.project).then(function (data) {
                    navigationModule.goBack();
                    _this.endLoading();
                }, function (error) {
                    _this.endLoading();
                });
            }
        });
    };
    ViewProjectViewModel.prototype.addTask = function () {
        var editTaskViewModel = new editTaskViewModelModule.EditTaskViewModel();
        editTaskViewModel.project = this.project;
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: editTaskViewModel
        });
    };
    ViewProjectViewModel.prototype.viewTask = function (viewTaskViewModel) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: viewTaskViewModel
        });
    };
    ViewProjectViewModel.prototype.refresh = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getTasksByProject(this.project).then(function (data) {
            var tasks = new Array();
            for (var i = 0; i < data.length; i++) {
                tasks.push(new viewTaskViewModelModule.ViewTaskViewModel(data[i]));
            }
            _this.tasks = tasks;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return ViewProjectViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ViewProjectViewModel = ViewProjectViewModel;
//# sourceMappingURL=view-project-view-model.js.map
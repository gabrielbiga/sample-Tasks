var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var viewTaskViewModelModule = require("../view-task/view-task-view-model");
var editTaskViewModelModule = require("../edit-task/edit-task-view-model");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var viewsModule = require("../../utils/views");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        this._selectedDay = 1;
    }
    Object.defineProperty(MainViewModel.prototype, "tasks", {
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
    Object.defineProperty(MainViewModel.prototype, "selectedDay", {
        get: function () {
            return this._selectedDay;
        },
        set: function (value) {
            if (this._selectedDay != value) {
                this._selectedDay = value;
                this.notifyPropertyChanged("selectedDay", value);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.addTask = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel()
        });
    };
    MainViewModel.prototype.viewTask = function (viewTaskViewModel) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: viewTaskViewModel
        });
    };
    MainViewModel.prototype.logout = function () {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    };
    MainViewModel.prototype.refresh = function () {
        var _this = this;
        this.beginLoading();
        var getTasksMethod = getMethodByFilter(this.selectedDay);
        getTasksMethod.then(function (data) {
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
    return MainViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.MainViewModel = MainViewModel;
function getMethodByFilter(selectedDay) {
    switch (selectedDay) {
        case 0:
            return serviceModule.service.getOverdueTasks();
        case 1:
            return serviceModule.service.getTasksForToday();
        case 2:
            return serviceModule.service.getTasksForTomorrow();
        default:
            return serviceModule.service.getTasksAfterTomorrow();
    }
}
//# sourceMappingURL=main-view-model.js.map
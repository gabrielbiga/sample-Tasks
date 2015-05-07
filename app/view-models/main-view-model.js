var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableArrayModule = require("data/observable-array");
var localSettings = require("local-settings");

var everliveModule = require("../lib/everlive");

var viewModelBaseModule = require("./view-model-base");
var viewTaskViewModelModule = require("./view-task-view-model");
var editTaskViewModelModule = require("./edit-task-view-model");

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);

        this.refresh();
    }
    MainViewModel.prototype.addTask = function () {
        this.navigateTo({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel({ Name: "", Email: "", Url: "", Notes: "" })
        });
    };

    MainViewModel.prototype.viewTask = function (task) {
        this.navigateTo({
            moduleName: "app/views/view-task",
            context: new viewTaskViewModelModule.ViewTaskViewModel(task)
        });
    };

    MainViewModel.prototype.logout = function () {
        localSettings.remove(TOKEN_DATA_KEY);
        this.navigateToAndClearHistory("app/views/login");
    };

    MainViewModel.prototype.refresh = function () {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        this.beginLoading();
        everlive.data('Task').get().then(function (data) {
            that.set("tasks", new observableArrayModule.ObservableArray(data.result));
            that.endLoading();
        }, function (error) {
            alert('Error gettings tasks[' + error.message + ']');
            that.endLoading();
        });
    };
    return MainViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map

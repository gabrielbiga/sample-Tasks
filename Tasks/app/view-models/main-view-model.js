var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var frameModule = require("ui/frame");
var enumsModule = require("ui/enums");
var localSettings = require("local-settings");

var everliveModule = require("../lib/everlive");
var viewTaskViewModelModule = require("./view-task-view-model");
var editTaskViewModelModule = require("./edit-task-view-model");

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);

        this.refresh();
    }
    Object.defineProperty(MainViewModel.prototype, "androidVisible", {
        get: function () {
            var topmost = frameModule.topmost();
            if (topmost.android) {
                return enumsModule.Visibility.visible;
            }

            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MainViewModel.prototype, "iosVisibility", {
        get: function () {
            var topmost = frameModule.topmost();
            if (topmost.ios) {
                return enumsModule.Visibility.visible;
            }

            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });

    MainViewModel.prototype.addTask = function () {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(mainViewModel, {})
        });
    };

    MainViewModel.prototype.editTask = function (task) {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(mainViewModel, task)
        });
    };

    MainViewModel.prototype.viewTask = function (task) {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/view-task",
            context: new viewTaskViewModelModule.ViewTaskViewModel(mainViewModel, task)
        });
    };

    MainViewModel.prototype.logout = function () {
        localSettings.remove(TOKEN_DATA_KEY);
        var topmost = frameModule.topmost();
        topmost.navigate("app/views/login");
    };

    MainViewModel.prototype.refresh = function () {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        everlive.data('Task').get().then(function (data) {
            that.set("tasks", new observableArrayModule.ObservableArray(data.result));
        }, function (error) {
            alert('Error gettings tasks[' + error.message + ']');
        });
    };
    return MainViewModel;
})(observableModule.Observable);
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map

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

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);

        this.refresh();
    }
    Object.defineProperty(MainViewModel.prototype, "testtest", {
        get: function () {
            return "visible";
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
        topmost.navigate("app/views/edit-task");
    };

    MainViewModel.prototype.viewTask = function (task) {
        var topmost = frameModule.topmost();
        var navigationEntry = {
            moduleName: "app/views/view-task",
            context: task
        };

        topmost.navigate(navigationEntry);
    };

    MainViewModel.prototype.refresh = function () {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        everlive.data('Task').get().then(function (data) {
            var tasks = new observableArrayModule.ObservableArray();
            for (var i = 0; i < data.result.length; i++) {
                tasks.push(MainViewModel.wrap(data.result[i]));
            }

            that.set("tasks", tasks);
        }, function (error) {
            alert('Error gettings tasks[' + error.message + ']');
        });
    };

    MainViewModel.wrap = function (object) {
        var result = new observableModule.Observable();
        for (var key in object) {
            var value = object[key];
            if (typeof (value) === "object") {
                //result.set(key, MainViewModel.wrap(value));
            } else {
                result.set(key, value);
            }
        }

        return result;
    };
    return MainViewModel;
})(observableModule.Observable);
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map

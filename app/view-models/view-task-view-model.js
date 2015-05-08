var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var localSettings = require("local-settings");
var dialogs = require("ui/dialogs");
var observableModule = require("data/observable");

var everliveModule = require("../lib/everlive");

var taskViewModelBaseModule = require("./task-view-model-base");
var editTaskViewModelModule = require("./edit-task-view-model");

var ViewTaskViewModel = (function (_super) {
    __extends(ViewTaskViewModel, _super);
    function ViewTaskViewModel(task) {
        _super.call(this, task);

        /*
        * Just for the sake of good design add these static properties here.
        * In the following iterations we will enable this functionality.
        * Follow our blog posts here - https://www.nativescript.org/blog and on twitter @NativeScript.
        */
        this.ProjectName = "To do";
        this.DueDateText = "today, 10:00 am";
        this.ReminderText = "8:00 am";
        this.Phone = "+359 88 055 5555";

        this.loadPicture();
    }
    Object.defineProperty(ViewTaskViewModel.prototype, "pictureUrl", {
        get: function () {
            return this._pictureUrl;
        },
        set: function (value) {
            if (this._pictureUrl !== value) {
                this._pictureUrl = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "pictureUrl", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    ViewTaskViewModel.prototype.deleteTask = function () {
        var that = this;
        dialogs.confirm("Are you sure you want to delete task?").then(function (result) {
            if (result) {
                that.beginLoading();
                var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
                everlive.data('Task').destroySingle({ Id: that.task.Id }, function (data) {
                    that.endLoading();
                    that.navigateToAndClearHistory("app/views/main");
                }, function (error) {
                    that.endLoading();
                    alert("Error deleting Task:[" + error.message + "]");
                });
            }
        });
    };

    ViewTaskViewModel.prototype.editTask = function () {
        /*
        * This is how you pass and argument to the next page.
        * For more options pls visit the documentation article  - http://docs.nativescript.org/navigation#navigation
        */
        var that = this;
        that.navigateTo({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(that.task)
        });
    };

    ViewTaskViewModel.prototype.completeTask = function () {
        alert("This functionality will be implemented in the next version!");
    };

    ViewTaskViewModel.prototype.loadPicture = function () {
        var that = this;
        if (that.task.Photo) {
            that.beginLoading();
            var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
            everlive.Files.getDownloadUrlById(this.task.Photo).then(function (url) {
                that.pictureUrl = url;
                that.endLoading();
            }, function (error) {
                alert("Error loading image:[" + error.message + "]");
                that.endLoading();
            });
        }
    };
    return ViewTaskViewModel;
})(taskViewModelBaseModule.TaskViewModelBase);
exports.ViewTaskViewModel = ViewTaskViewModel;
//# sourceMappingURL=view-task-view-model.js.map

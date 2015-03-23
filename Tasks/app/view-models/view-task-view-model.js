var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dialogs = require("ui/dialogs");
var localSettings = require("local-settings");

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
        this.ProjectName = "to do";
        this.DueDateText = "12-March";
        this.ReminderText = "5 minutes before";

        this.loadPhoto();
    }
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

    ViewTaskViewModel.hasPhoto = function (task) {
        var photoId = task.Photo;
        if (!photoId || photoId.indexOf("000") > -1) {
            return false;
        }

        return true;
    };

    ViewTaskViewModel.prototype.loadPhoto = function () {
        var that = this;
        if (ViewTaskViewModel.hasPhoto(that.task)) {
            that.beginLoading();
            var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
            everlive.Files.getDownloadUrlById(this.task.Photo).then(function (url) {
                that.set("photoUrl", url);
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

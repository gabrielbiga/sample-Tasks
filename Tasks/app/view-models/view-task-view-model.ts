import localSettings = require("local-settings");
import dialogs = require("ui/dialogs");
import observableModule = require("data/observable");

import everliveModule = require("../lib/everlive");

import taskViewModelBaseModule = require("./task-view-model-base");
import editTaskViewModelModule = require("./edit-task-view-model");

export class ViewTaskViewModel extends taskViewModelBaseModule.TaskViewModelBase {
    private _pictureUrl: string;
    
    constructor(task: any) {
        super(task);

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

    get pictureUrl(): any {
        return this._pictureUrl;
    }

    set pictureUrl(value: any) {
        if (this._pictureUrl !== value) {
            this._pictureUrl = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "pictureUrl", value: value });
        }
    }

    deleteTask() {
        var that = this;
        dialogs.confirm("Are you sure you want to delete task?")
            .then(function(result) {
                if (result) {
                    that.beginLoading();
                    var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
                    everlive.data('Task').destroySingle({ Id: that.task.Id }, function(data) {
                        that.endLoading();
                        that.navigateToAndClearHistory("app/views/main");
                    }, function(error) {
                            that.endLoading();
                            alert("Error deleting Task:[" + error.message + "]");
                        });
                }
            });
    }

    editTask() {
        /*
        * This is how you pass and argument to the next page.
        * For more options pls visit the documentation article  - http://docs.nativescript.org/navigation#navigation
        */
        var that = this;
        that.navigateTo({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(that.task)
        });
    }

    completeTask() {
        alert("This functionality will be implemented in the next version!")
    }

    private loadPicture() {
        var that = this;
        if (that.task.Photo) {
            that.beginLoading();
            var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
            everlive.Files.getDownloadUrlById(this.task.Photo)
                .then(function(url) {
                    that.pictureUrl = url;
                    that.endLoading();
                }, function(error) {
                    alert("Error loading image:[" + error.message + "]");
                    that.endLoading();
                });
        }
    }
} 
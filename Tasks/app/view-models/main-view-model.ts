import observableArrayModule = require("data/observable-array");
import localSettings = require("local-settings");

import everliveModule = require("../lib/everlive");

import viewModelBaseModule = require("./view-model-base");
import viewTaskViewModelModule = require("./view-task-view-model");
import editTaskViewModelModule = require("./edit-task-view-model");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();

        this.refresh();
    }

    addTask() {
        this.navigateTo({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel({Name: "", Email: "", Url: "", Notes: ""})
        });
    }

    viewTask(task: any) {
        this.navigateTo({
            moduleName: "app/views/view-task",
            context: new viewTaskViewModelModule.ViewTaskViewModel(task)
        });
    }

    logout() {
        localSettings.remove(TOKEN_DATA_KEY);
        this.navigateToAndClearHistory("app/views/login");
    }

    refresh() {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        this.beginLoading();
        everlive.data('Task').get()
            .then(function(data) {
                that.set("tasks", new observableArrayModule.ObservableArray(data.result));
                that.endLoading();
            }, function(error) {
                    alert('Error gettings tasks[' + error.message + ']');
                    that.endLoading();
                });
    }
}
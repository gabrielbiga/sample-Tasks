import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");
import frameModule = require("ui/frame");
import enumsModule = require("ui/enums");
import localSettings = require("local-settings");

import everliveModule = require("../lib/everlive");
import viewTaskViewModelModule = require("./view-task-view-model");
import editTaskViewModelModule = require("./edit-task-view-model");

export class MainViewModel extends observableModule.Observable {
    
    constructor() {
        super();

        this.refresh();
    }

    get androidVisible(): string {
        var topmost = <frameModule.Frame>frameModule.topmost();
        if (topmost.android) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }
    
     get iosVisibility(): string {
        var topmost = <frameModule.Frame>frameModule.topmost();
        if (topmost.ios) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    addTask() {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(mainViewModel, {})
        });
    }

    editTask(task: any) {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/edit-task",
            context: new editTaskViewModelModule.EditTaskViewModel(mainViewModel, task)
        });
    }

    viewTask(task: any) {
        var topmost = frameModule.topmost();
        var mainViewModel = this;
        topmost.navigate({
            moduleName: "app/views/view-task",
            context: new viewTaskViewModelModule.ViewTaskViewModel(mainViewModel, task)
        });
    }

    logout() {
        localSettings.remove(TOKEN_DATA_KEY);
        var topmost = frameModule.topmost();
        topmost.navigate("app/views/login");
    }

    refresh() {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        everlive.data('Task').get().then(function(data) {
            that.set("tasks", new observableArrayModule.ObservableArray(data.result));
        }, function(error) {
                alert('Error gettings tasks[' + error.message + ']');
            });
    }
}
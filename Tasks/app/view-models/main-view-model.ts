import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");
import frameModule = require("ui/frame");
import enumsModule = require("ui/enums");
import localSettings = require("local-settings");

import taskModule = require("../model/task");
import everliveModule = require("../lib/everlive");

export class MainViewModel extends observableModule.Observable {
    
    constructor() {
        super();

        this.refresh();
    }

    get testtest(): string {
        return "visible";
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
        topmost.navigate("app/views/edit-task");
    }

    viewTask(task: observableModule.Observable) {
        var topmost = frameModule.topmost();
        var navigationEntry = {
            moduleName: "app/views/view-task",
            context: task
        };

        topmost.navigate(navigationEntry);
    }

    refresh() {
        var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
        var that = this;
        everlive.data('Task').get().then(function(data) {
            var tasks = new observableArrayModule.ObservableArray();
            for (var i = 0; i < data.result.length; i++){
                tasks.push(MainViewModel.wrap(data.result[i]));
            }
            
            that.set("tasks", tasks);
        }, function(error) {
                alert('Error gettings tasks[' + error.message + ']');
            });
    }
    
    private static wrap(object: any): observableModule.Observable {
        var result = new observableModule.Observable();
        for (var key in object) {
            var value = object[key];
            if (typeof (value) === "object") {
                //result.set(key, MainViewModel.wrap(value));
            }
            else {
                result.set(key, value);
            }
        }

        return result;
    }
}
var observable = require("data/observable");
var observableArray = require("data/observable-array");

var virtualArray = require("data/virtual-array");
var localSettings = require("local-settings");

var everlive = require("../lib/everlive");
//var taskModel = require("../models/Task");
var frameModule = require("ui/frame");

var mainViewModel = function (source) {
        this._tasks = new observableArray.ObservableArray();        
        this._tasksRequested = false;
    }

Object.defineProperty(mainViewModel.prototype, "tasks", {
    get: function () 
    {
        if (!this._tasksRequested) {
            var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
            var that = this;
            el.data('Task').get().then(function(data) {
               that._tasks.push(data.result); 
            }, function(err) {
               alert('Error gettings tasks[' + JSON.stringify(err) + ']');
            });      
            this._tasksRequested = true;
        }
        return this._tasks;        
    }
});

mainViewModel.prototype.addTask = function () {
    var topmost = frameModule.topmost();
    localSettings.remove(TASK_ID_DATA_KEY);
    topmost.navigate("app/views/editTask");
}

mainViewModel.prototype.viewTask = function (task) {
    var topmost = frameModule.topmost();
    /*var navigationEntry = {
        moduleName: "app/views/viewTask",
        context: {taskId: args},
        animated: false
    };*/
    localSettings.setString("taskId", task.Id); // TODO: passing parameters not working
    topmost.navigate("app/views/viewTask");
}

exports.mainViewModel = mainViewModel;

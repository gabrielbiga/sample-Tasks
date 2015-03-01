var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

/*
 - task with some calculated props like
      - isOverdue
*/
var observable = require("data/observable");
var localSettings = require("local-settings");

var everlive = require("../lib/everlive");
//var taskModel = require("../models/Task");
var frameModule = require("ui/frame");

var viewTaskViewModel = (function (_super) {
    __extends(viewTaskViewModel, _super);

    function viewTaskViewModel(source) {
        _super.call(this);
        this._task = new observable.Observable();        
        this._taskRequested = false;
    }

    Object.defineProperty(viewTaskViewModel.prototype, "task", {
        get: function () 
        {
            if (!this._taskRequested) {
                var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
                var that = this;
                el.data('Task').getById(localSettings.getString(TASK_ID_DATA_KEY)).then(
                    function(data) {
                        
                        that.set("task", data.result);
                    },
                    function(error) {
                        alert(JSON.stringify(error));
                    });
                this._taskRequested = true;
            }
            return this._task;
        },
        
        set : function(value)
        {
            if (this._task !== value) {
                this._task = value;
                this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "task", value: value });
            }
        
            alert("Asdasd[" + JSON.stringify(value) + "]");        
        }
    });
    return viewTaskViewModel;
})(observable.Observable);

exports.viewTaskViewModel = viewTaskViewModel;

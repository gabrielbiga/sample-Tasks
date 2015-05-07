var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");

var viewModelBaseModule = require("./view-model-base");

var TaskViewModelBase = (function (_super) {
    __extends(TaskViewModelBase, _super);
    function TaskViewModelBase(task) {
        _super.call(this);

        this.task = task;
    }
    Object.defineProperty(TaskViewModelBase.prototype, "task", {
        get: function () {
            return this._task;
        },
        set: function (value) {
            if (this._task !== value) {
                this._task = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "task", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });

    return TaskViewModelBase;
})(viewModelBaseModule.ViewModelBase);
exports.TaskViewModelBase = TaskViewModelBase;
//# sourceMappingURL=task-view-model-base.js.map

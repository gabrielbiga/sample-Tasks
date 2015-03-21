var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");

var TaskViewModelBase = (function (_super) {
    __extends(TaskViewModelBase, _super);
    function TaskViewModelBase(mainViewModel, task) {
        _super.call(this);

        this._mainViewModel = mainViewModel;
        this._task = task;
    }
    Object.defineProperty(TaskViewModelBase.prototype, "mainViewModel", {
        get: function () {
            return this._mainViewModel;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TaskViewModelBase.prototype, "task", {
        get: function () {
            return this_task;
        },
        enumerable: true,
        configurable: true
    });
    return TaskViewModelBase;
})(observableModule.Observable);
exports.TaskViewModelBase = TaskViewModelBase;
//# sourceMappingURL=task-view-model-base.js.map

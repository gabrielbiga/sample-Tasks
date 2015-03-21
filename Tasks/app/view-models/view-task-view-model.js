var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var taskViewModelBaseModule = require("./task-view-model-base");

var ViewTaskViewModel = (function (_super) {
    __extends(ViewTaskViewModel, _super);
    function ViewTaskViewModel(mainViewModel, task) {
        _super.call(this, mainViewModel, task);
    }
    return ViewTaskViewModel;
})(taskViewModelBaseModule.TaskViewModelBase);
exports.ViewTaskViewModel = ViewTaskViewModel;
//# sourceMappingURL=view-task-view-model.js.map

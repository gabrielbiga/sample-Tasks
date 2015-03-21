var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var taskViewModelBaseModule = require("./task-view-model-base");

var EditTaskViewModel = (function (_super) {
    __extends(EditTaskViewModel, _super);
    function EditTaskViewModel(mainViewModel, task) {
        _super.call(this, mainViewModel, task);
    }
    return EditTaskViewModel;
})(taskViewModelBaseModule.TaskViewModelBase);
exports.EditTaskViewModel = EditTaskViewModel;
//# sourceMappingURL=edit-task-view-model.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var editViewModelBaseModule = require("../common/edit-view-model-base");
var notificationsModule = require("../../utils/notifications");
var serviceModule = require("../../utils/service");
var constantsModule = require("../../utils/constants");
var EditTaskViewModel = (function (_super) {
    __extends(EditTaskViewModel, _super);
    function EditTaskViewModel(task) {
        _super.call(this, task);
        this.project = {
            Name: "To do"
        };
    }
    Object.defineProperty(EditTaskViewModel.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            if (this._project !== value) {
                this._project = value;
                this.notifyPropertyChanged("project", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditTaskViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.DueDate = new Date();
        item.ReminderDate = new Date();
        item.Project = constantsModule.defaultProjectId;
        item.Phone = "+359 555 55 555";
        item.Email = "zlobcho@mail.bg";
        item.Url = "telerik.com";
        return item;
    };
    EditTaskViewModel.prototype.addItem = function (item) {
        return serviceModule.service.createTask(item);
    };
    EditTaskViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateTask(item);
    };
    EditTaskViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteTask(item);
    };
    EditTaskViewModel.prototype.takePicture = function () {
    };
    EditTaskViewModel.prototype.validate = function () {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    return EditTaskViewModel;
})(editViewModelBaseModule.EditViewModelBase);
exports.EditTaskViewModel = EditTaskViewModel;
//# sourceMappingURL=edit-task-view-model.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var editViewModelBaseModule = require("../common/edit-view-model-base");
var notificationsModule = require("../../utils/notifications");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var EditProjectViewModel = (function (_super) {
    __extends(EditProjectViewModel, _super);
    function EditProjectViewModel(project) {
        _super.call(this, project);
        this.isDefault = serviceModule.service.isDefaultProject(project);
    }
    Object.defineProperty(EditProjectViewModel.prototype, "isDefault", {
        get: function () {
            return this._isDefault;
        },
        set: function (value) {
            if (this._isDefault != value) {
                this._isDefault = value;
                this.notifyPropertyChanged("isDefault", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditProjectViewModel.prototype.addItem = function (item) {
        console.log("ADD PROJECT");
        return serviceModule.service.createProject(item);
    };
    EditProjectViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateProject(item);
    };
    EditProjectViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteProject(item);
    };
    EditProjectViewModel.prototype.validate = function () {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    EditProjectViewModel.prototype.onItemDeleted = function (item) {
        _super.prototype.onItemDeleted.call(this, item);
        navigationModule.goBack();
    };
    return EditProjectViewModel;
})(editViewModelBaseModule.EditViewModelBase);
exports.EditProjectViewModel = EditProjectViewModel;
//# sourceMappingURL=edit-project-view-model.js.map
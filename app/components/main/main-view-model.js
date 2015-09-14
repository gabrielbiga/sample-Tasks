var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var editProfileViewModelModule = require("../edit-profile/edit-profile-view-model");
var listPickerViewModelModule = require("../list-picker/list-picker-view-model");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        var tasksView = {
            Id: 1,
            Name: "Tasks",
            View: viewsModule.Views.tasks
        };
        var projectsView = {
            Id: 2,
            Name: "Projects",
            View: viewsModule.Views.projects
        };
        this._views = new listPickerViewModelModule.ListPickerViewModel(function () {
            return new Promise(function (resolve, reject) {
                resolve([tasksView, projectsView]);
            });
        }, tasksView, function (selectedItem) {
        });
        this.refresh();
    }
    Object.defineProperty(MainViewModel.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            if (this._user !== value) {
                this._user = value;
                this.notifyPropertyChange("user", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "views", {
        get: function () {
            return this._views;
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.editProfile = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProfile,
            context: new editProfileViewModelModule.EditProfileViewModel(this.user)
        });
    };
    MainViewModel.prototype.logout = function () {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    };
    MainViewModel.prototype.refresh = function () {
        var _this = this;
        if (!this.beginLoading())
            return;
        serviceModule.service.getCurrentUser().then(function (user) {
            _this.user = user;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return MainViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.MainViewModel = MainViewModel;

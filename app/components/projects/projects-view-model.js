var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var viewProjectViewModelModule = require("../view-project/view-project-view-model");
var editProjectViewModelModule = require("../edit-project/edit-project-view-model");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var viewsModule = require("../../utils/views");
var ProjectsViewModel = (function (_super) {
    __extends(ProjectsViewModel, _super);
    function ProjectsViewModel() {
        _super.call(this);
    }
    Object.defineProperty(ProjectsViewModel.prototype, "projects", {
        get: function () {
            return this._projects;
        },
        set: function (value) {
            if (this._projects != value) {
                this._projects = value;
                this.notifyPropertyChanged("projects", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ProjectsViewModel.prototype.addProject = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProject,
            context: new editProjectViewModelModule.EditProjectViewModel()
        });
    };
    ProjectsViewModel.prototype.viewProject = function (viewProjectViewModel) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewProject,
            context: viewProjectViewModel
        });
    };
    ProjectsViewModel.prototype.logout = function () {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    };
    ProjectsViewModel.prototype.refresh = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getProjects().then(function (data) {
            var projects = new Array();
            for (var i = 0; i < data.length; i++) {
                projects.push(new viewProjectViewModelModule.ViewProjectViewModel(data[i]));
            }
            _this.projects = projects;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return ProjectsViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ProjectsViewModel = ProjectsViewModel;
//# sourceMappingURL=projects-view-model.js.map
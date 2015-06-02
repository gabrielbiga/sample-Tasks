var projectsViewModelModule = require("./projects-view-model");
var viewModel = new projectsViewModelModule.ProjectsViewModel();
function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
function listViewItemTap(args) {
    viewModel.viewProject(args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
//# sourceMappingURL=projects.js.map
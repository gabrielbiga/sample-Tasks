var projectsViewModelModule = require("./projects-view-model");
var viewModel = new projectsViewModelModule.ProjectsViewModel();
function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
//# sourceMappingURL=projects.js.map
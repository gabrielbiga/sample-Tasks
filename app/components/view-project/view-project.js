var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
function editProjectButtonTap() {
    viewModel.editProject();
}
exports.editProjectButtonTap = editProjectButtonTap;
function deleteProjectButtonTap() {
    viewModel.deleteProject();
}
exports.deleteProjectButtonTap = deleteProjectButtonTap;
function addTaskButtonTap() {
    viewModel.addTask();
}
exports.addTaskButtonTap = addTaskButtonTap;
function listViewItemTap(args) {
    viewModel.viewTask(args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
function completeTaskButtonTap(args) {
    var view = args.view;
    var viewTaskViewModel = view.bindingContext;
    viewTaskViewModel.completeTask();
}
exports.completeTaskButtonTap = completeTaskButtonTap;
//# sourceMappingURL=view-project.js.map
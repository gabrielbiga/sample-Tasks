var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
function editTaskButtonTap() {
    viewModel.editTask();
}
exports.editTaskButtonTap = editTaskButtonTap;
function completeTaskButtonTap() {
    viewModel.completeTask();
}
exports.completeTaskButtonTap = completeTaskButtonTap;
//# sourceMappingURL=view-task.js.map
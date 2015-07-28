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
function addTaskButtonTap() {
    viewModel.addTask();
}
exports.addTaskButtonTap = addTaskButtonTap;

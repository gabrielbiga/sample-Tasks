var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function saveButtonTap(args) {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;

var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
//# sourceMappingURL=view-project.js.map
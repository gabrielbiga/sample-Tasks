var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function doneMenuItemTap(args) {
    viewModel.done();
}
exports.doneMenuItemTap = doneMenuItemTap;

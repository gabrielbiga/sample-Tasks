var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function itemTap(args) {
    var view = args.view;
    viewModel.selectItem(view.bindingContext);
}
exports.itemTap = itemTap;
function doneMenuItemTap(args) {
    viewModel.done();
}
exports.doneMenuItemTap = doneMenuItemTap;

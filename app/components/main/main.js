var mainViewModelModule = require("./main-view-model");
var navigationModule = require("../../utils/navigation");
var viewModel = new mainViewModelModule.MainViewModel();
function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function viewTap(args) {
    var view = args.view;
    viewModel.views.selectItem(view.bindingContext);
    var data = view.bindingContext.data;
    navigationModule.navigate(data.View);
}
exports.viewTap = viewTap;
function editProfileButtonTap() {
    viewModel.editProfile();
}
exports.editProfileButtonTap = editProfileButtonTap;
function logoutButtonTap() {
    viewModel.logout();
}
exports.logoutButtonTap = logoutButtonTap;

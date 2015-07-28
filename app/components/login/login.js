var loginViewModelModule = require("./login-view-model");
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = new loginViewModelModule.LoginViewModel();
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function loginButtonTap(args) {
    viewModel.login();
}
exports.loginButtonTap = loginButtonTap;
function signUpButtonTap(args) {
    viewModel.signUp();
}
exports.signUpButtonTap = signUpButtonTap;

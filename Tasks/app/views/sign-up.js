var signUpViewModelModule = require("../view-models/sign-up-view-model")

var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = new signUpViewModelModule.SignUpViewModel();
    page.bindingContext = viewModel;
}

exports.navigatedTo = navigatedTo;

function signUpButtonTap(args) {
    viewModel.signUp();
}

exports.signUpButtonTap = signUpButtonTap;

function loginButtonTap(args) {
    viewModel.login();
}

exports.cancelButtonTap = loginButtonTap;
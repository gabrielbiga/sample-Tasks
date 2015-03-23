var signUpViewModelModule = require("../view-models/sign-up-view-model")

var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = new signUpViewModelModule.SignUpViewModel();
    page.bindingContext = viewModel;
}

exports.navigatedTo = navigatedTo;

function saveButtonTap(args) {
    viewModel.register();
}

exports.saveButtonTap = saveButtonTap;

function cancelButtonTap(args) {
    viewModel.cancel();
}

exports.cancelButtonTap = cancelButtonTap;
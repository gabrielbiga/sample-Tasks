var signUpViewModelModule = require("../view-models/sign-up-view-model")

var viewModel;
function onNavigatedTo(args) {
    var page = args.object;
    viewModel = new signUpViewModelModule.SignUpViewModel();
    page.bindingContext = viewModel;
}

exports.onNavigatedTo = onNavigatedTo;

function onSaveButtonTap(args) {
    viewModel.register();
}

exports.onSaveButtonTap = onSaveButtonTap;

function onCancelButtonTap(args) {
    viewModel.goBack();
}

exports.onCancelButtonTap = onCancelButtonTap;
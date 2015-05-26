import observableModule = require("data/observable");

import pageModule = require("ui/page");

import signUpViewModelModule = require("./sign-up-view-model")

var viewModel: signUpViewModelModule.SignUpViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = new signUpViewModelModule.SignUpViewModel();
    page.bindingContext = viewModel;
}

export function signUpButtonTap(args) {
    viewModel.signUp();
}

export function loginButtonTap(args) {
    viewModel.login();
}

import observableModule = require("data/observable");

import pageModule = require("ui/page");

import editProfileViewModelModule = require("./edit-profile-view-model")

var viewModel: editProfileViewModelModule.EditProfileViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}

export function saveButtonTap(args) {
    viewModel.save();
}
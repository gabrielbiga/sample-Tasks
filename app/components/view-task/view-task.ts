import viewTaskViewModel = require("./view-task-view-model");

var viewModel: viewTaskViewModel.ViewTaskViewModel;
export function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;

    viewModel.loadPhoto();
}
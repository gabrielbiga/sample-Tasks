import viewModule = require("ui/core/view");

import listViewModule = require("ui/list-view");
import gesturesModule = require("ui/gestures");

import viewProjectViewModel = require("./view-project-view-model");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");

var viewModel: viewProjectViewModel.ViewProjectViewModel;
export function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

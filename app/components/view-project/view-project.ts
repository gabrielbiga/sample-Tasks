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

export function editProjectButtonTap() {
    viewModel.editProject();
}

export function deleteProjectButtonTap() {
    viewModel.deleteProject();
}

export function addTaskButtonTap() {
    viewModel.addTask();
}

export function listViewItemTap(args: listViewModule.ItemEventData) {
    viewModel.viewTask(args.view.bindingContext);
}

export function completeTaskButtonTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewTaskViewModel = <viewTaskViewModelModule.ViewTaskViewModel>view.bindingContext;
    viewTaskViewModel.completeTask();
}
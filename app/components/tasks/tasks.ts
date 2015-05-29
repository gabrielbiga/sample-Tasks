import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import listViewModule = require("ui/list-view");
import frameModule = require("ui/frame");
import pageModule = require("ui/page");
import gesturesModule = require("ui/gestures");

import tasksViewModelModule = require("./tasks-view-model")
import viewTaskViewModelModule = require("../view-task/view-task-view-model")
import serviceModule = require("../../utils/service")
import viewsModule = require("../../utils/views")

var viewModel = new tasksViewModelModule.TasksViewModel();
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

export function listViewItemTap(args: listViewModule.ItemEventData) {
    viewModel.viewTask(args.view.bindingContext);
}

export function completeTaskButtonTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewTaskViewModel = <viewTaskViewModelModule.ViewTaskViewModel>view.bindingContext;
    viewTaskViewModel.completeTask();
}

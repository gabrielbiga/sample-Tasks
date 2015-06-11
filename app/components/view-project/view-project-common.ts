import viewModule = require("ui/core/view");

import gesturesModule = require("ui/gestures");

import viewTaskViewModelModule = require("../view-task/view-task-view-model");

export function completeTaskButtonTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewTaskViewModel = <viewTaskViewModelModule.ViewTaskViewModel>view.bindingContext;
    viewTaskViewModel.completeTask();
}
import observableModule = require("data/observable");

import pageModule = require("ui/page");

import editTaskViewModelModule = require("./edit-task-view-model");

import datePickerViewModelModule = require("../date-picker/date-picker-view-model");
import timePickerViewModelModule = require("../time-picker/time-picker-view-model");
import listPickerViewModelModule = require("../list-picker/list-picker-view-model");

import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

var viewModel: editTaskViewModelModule.EditTaskViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}

export function takePictureButtonTap() {
    viewModel.takePicture(); 
} 

export function projectPickerTap() {
}

export function datePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(viewModel.item.DueDate,(day: number, month: number, year: number) => {
            var date = <Date>viewModel.item.DueDate;
            date.setDate(day);
            date.setMonth(month);
            date.setFullYear(year);

            viewModel.item.DueDate = date;
            console.log("DUE DATE: " + viewModel.item.DueDate);
        })
    });
}

export function timePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.timePicker,
        context: new timePickerViewModelModule.TimePickerViewModel(viewModel.item.DueDate,(hour: number, minute: number) => {
            var date = <Date>viewModel.item.DueDate;
            date.setHours(hour);
            date.setMinutes(minute);

            viewModel.item.DueDate = date;
            console.log("DUE DATE: " + viewModel.item.DueDate);
            console.log("HOUR: " + hour + ":" + minute);
        })
    });
}

export function reminderPickerTap() {
}

export function saveButtonTap() {
    viewModel.save();
}

export function deleteButtonTap() {
    viewModel.del();
}
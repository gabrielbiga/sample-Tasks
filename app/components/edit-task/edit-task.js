var datePickerViewModelModule = require("../date-picker/date-picker-view-model");
var timePickerViewModelModule = require("../time-picker/time-picker-view-model");
var listPickerViewModelModule = require("../list-picker/list-picker-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var serviceModule = require("../../utils/service");
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function takePictureButtonTap() {
    viewModel.takePicture();
}
exports.takePictureButtonTap = takePictureButtonTap;
function projectPickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.listPicker,
        context: new listPickerViewModelModule.ListPickerViewModel(function () {
            return serviceModule.service.getProjects();
        }, viewModel.project, function (selectedItem) {
            viewModel.project = selectedItem;
        })
    });
}
exports.projectPickerTap = projectPickerTap;
function datePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(viewModel.item.DueDate, function (day, month, year) {
            var date = viewModel.item.DueDate;
            date.setDate(day);
            date.setMonth(month);
            date.setFullYear(year);
            viewModel.item.DueDate = date;
        })
    });
}
exports.datePickerTap = datePickerTap;
function timePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.timePicker,
        context: new timePickerViewModelModule.TimePickerViewModel(viewModel.item.DueDate, function (hour, minute) {
            var date = viewModel.item.DueDate;
            date.setHours(hour);
            date.setMinutes(minute);
            viewModel.item.DueDate = date;
        })
    });
}
exports.timePickerTap = timePickerTap;
function reminderPickerTap() {
}
exports.reminderPickerTap = reminderPickerTap;
function saveButtonTap() {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;
function deleteButtonTap() {
    viewModel.del();
}
exports.deleteButtonTap = deleteButtonTap;
//# sourceMappingURL=edit-task.js.map
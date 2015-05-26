import editTaskViewModelModule = require("./edit-task-view-model");

var viewModel: editTaskViewModelModule.EditTaskViewModel;
export function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel
}

export function takePictureButtonClick() {
    viewModel.takePicture(); 
} 
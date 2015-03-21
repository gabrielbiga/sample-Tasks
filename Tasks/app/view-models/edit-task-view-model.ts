import taskViewModelBaseModule = require("./task-view-model-base");
import mainViewModelModule = require("./main-view-model");

export class EditTaskViewModel extends taskViewModelBaseModule.TaskViewModelBase {
    constructor(mainViewModel: mainViewModelModule.MainViewModel, task: observableModule.Observable) {
        super(mainViewModel, task);
    }
}
import observableArrayModule = require("data/observable-array");

import viewModelBaseModule = require("../common/view-model-base");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import viewsModule = require("../../utils/views");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    private _tasks: Array<viewTaskViewModelModule.ViewTaskViewModel>;

    constructor() {
        super();
    }

    get tasks(): Array<viewTaskViewModelModule.ViewTaskViewModel> {
        return this._tasks;
    }

    set tasks(value: Array<viewTaskViewModelModule.ViewTaskViewModel>) {
        if (this._tasks != value) {
            this._tasks = value;
            this.notifyPropertyChanged("tasks", value);
        }
    }

    addTask() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel()
        });
    }

    viewTask(viewTaskViewModel: any) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: viewTaskViewModel
        });
    }

    logout() {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    }

    refresh() {
        this.beginLoading();
        serviceModule.service.getTasks().then((data: any[]) => {
            var tasks = new Array<viewTaskViewModelModule.ViewTaskViewModel>();
            for (var i = 0; i < data.length; i++) {
                tasks.push(new viewTaskViewModelModule.ViewTaskViewModel(data[i]));
            }

            this.tasks = tasks;
            this.endLoading();
        },(error: any) => {
                this.endLoading();
            });
    }
}
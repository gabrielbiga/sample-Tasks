import observableModule = require("data/observable");

import mainViewModelModule = require("./main-view-model");

export class TaskViewModelBase extends observableModule.Observable {
    private _mainViewModel: mainViewModelModule.MainViewModel;
    private _task: observableModule.Observable;

    constructor(mainViewModel: mainViewModelModule.MainViewModel, task: observableModule.Observable) {
        super();

        this._mainViewModel = mainViewModel;
        this._task = task;
    }

    get mainViewModel(): mainViewModelModule.MainViewModel {
        return this._mainViewModel;
    }

    get task(): observableModule.Observable {
        return this_task;
    }
}
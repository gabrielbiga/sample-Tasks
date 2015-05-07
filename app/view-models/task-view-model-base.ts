import observableModule = require("data/observable");

import viewModelBaseModule = require("./view-model-base");

export class TaskViewModelBase extends viewModelBaseModule.ViewModelBase {
    private _task: any;

    constructor(task: any) {
        super();

        this.task = task;
    }
    
    get task(): any {
        return this._task;
    }

    set task(value: any) {
        if (this._task !== value) {
            this._task = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "task", value: value });
        }
    }
}
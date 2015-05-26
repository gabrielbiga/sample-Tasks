import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import notificationsModule = require("../../utils/notifications");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class ViewTaskViewModel extends viewModelBaseModule.ViewModelBase {
    private _project: any;
    private _task: any;
    private _pictureUrl: string;

    constructor(task: any) {
        super();

        this.task = task;
        this.project = {
            Name: "To do"
        };

        this.pictureUrl = null;
    }

    get task(): any {
        return this._task;
    }

    set task(value: any) {
        if (this._task != value) {
            this._task = value;
            this.notifyPropertyChanged("task", value);
        }
    }

    get project(): any {
        return this._project;
    }

    set project(value: any) {
        if (this._project != value) {
            this._project = value;
            this.notifyPropertyChanged("project", value);
        }
    }

    get pictureUrl(): any {
        return this._pictureUrl;
    }

    set pictureUrl(value: any) {
        if (this._pictureUrl !== value) {
            this._pictureUrl = value;
            this.notifyPropertyChanged("pictureUrl", value);
        }
    }

    loadPhoto() {
        if (this.task.Photo && !this.pictureUrl) {
            this.beginLoading();
            serviceModule.service.getDownloadUrlFromId(this.task.Photo).then(url => {
                this.pictureUrl = url;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }

    editTask() {
        /*
        * This is how you pass and argument to the next page.
        * For more options pls visit the documentation article  - http://docs.nativescript.org/navigation#navigation
        */
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel(this.task)
        });
    }

    deleteTask() {
    }

    completeTask() {
        alert("This functionality will be implemented in the next version!")
    }
} 
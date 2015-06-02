import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import notificationsModule = require("../../utils/notifications");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import constantsModule = require("../../utils/constants");

export class ViewTaskViewModel extends viewModelBaseModule.ViewModelBase {
    private _project: any;
    private _task: any;
    private _pictureUrl: string;

    constructor(task: any) {
        super();

        this.task = task;
        this.pictureUrl = null;

        this.loadProject();
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
        notificationsModule.confirm(constantsModule.deleteTaskHeader, constantsModule.deleteTaskMessage).then((value: boolean) => {
            if (value) {
                this.beginLoading();
                serviceModule.service.deleteTask(this.task).then((data) => {
                    navigationModule.goBack();
                    this.endLoading();
                },(error) => {
                        this.endLoading();
                    });
            }
        });
    }

    completeTask() {
        alert("This functionality will be implemented in the next version!")
    }

    refresh() {
        this.loadPhoto();
        this.loadProject();
    }

    loadPhoto() {
        if (this.task.Photo) {
            this.beginLoading();
            serviceModule.service.getDownloadUrlFromId(this.task.Photo).then(url => {
                this.pictureUrl = url;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }

    loadProject() {
        if (this.task.Project) {
            this.beginLoading();
            serviceModule.service.getProject(this.task.Project).then(project => {
                this.project = project;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }
}
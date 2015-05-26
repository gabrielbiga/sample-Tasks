import cameraModule = require("camera");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import editViewModelBaseModule = require("../common/edit-view-model-base");
import notificationsModule = require("../../utils/notifications");
import serviceModule = require("../../utils/service");
import constantsModule = require("../../utils/constants");

export class EditTaskViewModel extends editViewModelBaseModule.EditViewModelBase{
    private _project: any;
    private _picture: imageSourceModule.ImageSource;
    
    constructor(task?: any) {
        super(task);

        this.project = {
            Name: "To do"
        };
    }

    get project(): any {
        return this._project;
    }

    set project(value: any) {
        if (this._project !== value) {
            this._project = value;
            this.notifyPropertyChanged("project", value);
        }
    }

    createItem(): any {
        var item = super.createItem();
        item.DueDate = new Date();
        item.Reminder = new Date();
        item.Project = constantsModule.defaultProjectId;
        item.Phone = "+359 555 55 555";
        item.Email = "zlobcho@mail.bg";
        item.Url = "telerik.com";

        return item;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createTask(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateTask(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteTask(item);
    }

    takePicture() {
    }

    validate(): boolean {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }

        return super.validate();
    }
}
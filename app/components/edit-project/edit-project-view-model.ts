import cameraModule = require("camera");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import editViewModelBaseModule = require("../common/edit-view-model-base");
import notificationsModule = require("../../utils/notifications");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import constantsModule = require("../../utils/constants");

export class EditProjectViewModel extends editViewModelBaseModule.EditViewModelBase {
    private _isDefault: boolean;

    constructor(project?: any) {
        super(project);

        this.isDefault = serviceModule.service.isDefaultProject(project);
    }

    get isDefault(): boolean {
        return this._isDefault;
    }

    set isDefault(value: boolean) {
        if (this._isDefault != value) {
            this._isDefault = value;
            this.notifyPropertyChanged("isDefault", value);
        }
    }

    addItem(item: any): Promise<any> {
        console.log("ADD PROJECT");
        return serviceModule.service.createProject(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateProject(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteProject(item);
    }

    validate(): boolean {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }

        return super.validate();
    }

    onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }
}
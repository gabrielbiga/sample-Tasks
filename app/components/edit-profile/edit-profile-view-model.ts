import viewModelBaseModule = require("../common/view-model-base");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class editProfileViewModel extends viewModelBaseModule.ViewModelBase {
    private _user: any;

    constructor() {
        super();
    }

    get user(): any {
        return this._user;
    }

    set user(value: any) {
        if (this._user !== value) {
            this._user = value;
            this.notifyPropertyChanged("user", value);
        }
    }

    private validate(): boolean {
        if (this.user.Name === "") {
            this.showError("Please enter your name.");
            return false;
        }
    }
}
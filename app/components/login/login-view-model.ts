import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class LoginViewModel extends viewModelBaseModule.ViewModelBase {
    private _username: string;
    private _password: string;

    constructor() {
        super();

        this._username = "";
        this._password = "";
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChanged("username", value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChanged("password", value);
        }
    }

    login() {
        if (this.validate()) {
            this.beginLoading();
            serviceModule.service.login(this.username, this.password).then((data: any) => {
                navigationModule.navigateWitouthHistory(viewsModule.Views.main);
                this.endLoading();
            },(error: any) => {
                    this.clearPassword();
                    this.endLoading();
                });
        }
        else {
            this.clearPassword();
        }
    }

    signUp() {
        navigationModule.navigate(viewsModule.Views.signUp);
    }

    private clearPassword() {
        this.password = "";
    }

    private validate(): boolean {
        if (!this.username || this.username === "") {
            this.showError("Please enter username.");
            return false;
        }

        if (!this.password || this.password === "") {
            this.showError("Please enter password.");
            return false;
        }

        return true;
    }
}
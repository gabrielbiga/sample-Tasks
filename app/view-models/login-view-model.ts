import localSettings = require("local-settings");
import observableModule = require("data/observable");

import everliveModule = require("../lib/everlive");

import viewModelBaseModule = require("./view-model-base");

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
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "username", value: value });
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "password", value: value });
        }
    }

    login() {
        if (this.validate()) {
            var that = this;
            that.beginLoading();

            /*
            * Everlive is the SDK of the BAAS we are using as part of the
            * Telerik Platform. (see more here: http://platform.telerik.com)
            * 
            * For more info on what this SDK offers - http://docs.telerik.com/platform/backend-services/what-are-telerik-backend-services
            *
            * You can use any other JavaScript or native SDKs with NativeScript.
            */
            var everlive = new everliveModule(global.TELERIK_BAAS_KEY);
            everlive.Users.login(that.username, that.password,
                function(data) {
                    that.endLoading();
                    that.saveToken(data.result.access_token);
                    that.navigateToAndClearHistory("app/views/main");
                }, function(error) {
                    that.endLoading();
                    that.clearPassword();
                    /*
                     * Here you can see a more advanced usage of the dialogs.alert.
                     * You can specify the dialog header and the string used for the OK button.
                     * 
                     * For more options you can check the docs - http://docs.nativescript.org/ui-dialogs
                     */
                    alert({ title: "Error logging you in!", message: error.message, okButtonText: "Close" });
                });
        }
        else {
            this.clearPassword();
        }
    }

    signUp() {
        this.navigateTo("app/views/sign-up");
    }

    private clearPassword() {
        this.password = "";
    }

    private validate(): boolean {
        if (this.username === "") {
            alert("Please enter username.");
            return false;
        }

        if (this.password === "") {
            alert("Please enter password.");
            return false;
        }

        return true;
    }

    private saveToken(token: string) {
        localSettings.setString(TOKEN_DATA_KEY, token);
    }
}
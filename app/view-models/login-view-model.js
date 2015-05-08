var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var localSettings = require("local-settings");
var observableModule = require("data/observable");

var everliveModule = require("../lib/everlive");

var viewModelBaseModule = require("./view-model-base");

var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);

        this._username = "";
        this._password = "";
    }
    Object.defineProperty(LoginViewModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            if (this._username !== value) {
                this._username = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "username", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LoginViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (this._password !== value) {
                this._password = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "password", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    LoginViewModel.prototype.login = function () {
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
            everlive.Users.login(that.username, that.password, function (data) {
                that.endLoading();
                that.saveToken(data.result.access_token);
                that.navigateToAndClearHistory("app/views/main");
            }, function (error) {
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
        } else {
            this.clearPassword();
        }
    };

    LoginViewModel.prototype.signUp = function () {
        this.navigateTo("app/views/sign-up");
    };

    LoginViewModel.prototype.clearPassword = function () {
        this.password = "";
    };

    LoginViewModel.prototype.validate = function () {
        if (this.username === "") {
            alert("Please enter username.");
            return false;
        }

        if (this.password === "") {
            alert("Please enter password.");
            return false;
        }

        return true;
    };

    LoginViewModel.prototype.saveToken = function (token) {
        localSettings.setString(TOKEN_DATA_KEY, token);
    };
    return LoginViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=login-view-model.js.map

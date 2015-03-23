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

var SignUpViewModel = (function (_super) {
    __extends(SignUpViewModel, _super);
    function SignUpViewModel() {
        _super.call(this);

        this._name = "";
        this._email = "";
        this._username = "";
        this._password = "";
        this._passwordRepeat = "";
    }
    Object.defineProperty(SignUpViewModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "name", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(SignUpViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            if (this._email !== value) {
                this._email = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "email", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(SignUpViewModel.prototype, "username", {
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


    Object.defineProperty(SignUpViewModel.prototype, "password", {
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


    Object.defineProperty(SignUpViewModel.prototype, "passwordRepeat", {
        get: function () {
            return this._passwordRepeat;
        },
        set: function (value) {
            if (this._passwordRepeat !== value) {
                this._passwordRepeat = value;
                this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "passwordRepeat", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });


    SignUpViewModel.prototype.register = function () {
        if (this.validate()) {
            var that = this;
            that.beginLoading();
            var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
            everlive.Users.register(that.username, that.password, { Email: that.email, DisplayName: that.name }, function (data) {
                that.endLoading();
                alert({ title: "Registration sucess!", message: "Please login with your credentials now.", okButtonText: "Close" });
                that.goBack();
            }, function (error) {
                that.endLoading();
                that.clearPasswords();
                alert({ title: "Registration problem!", message: error.message, okButtonText: "Close" });
            });
        } else {
            this.clearPasswords();
        }
    };

    SignUpViewModel.prototype.cancel = function () {
        this.goBack();
    };

    SignUpViewModel.prototype.clearPasswords = function () {
        this.password = "";
        this.passwordRepeat = "";
    };

    SignUpViewModel.prototype.validate = function () {
        if (this.name === "") {
            alert("Please enter your name.");
            return false;
        }

        if (this.email == "") {
            alert("Please enter your email.");
            return false;
        }

        if (this.username == "") {
            alert("Please enter username.");
            return false;
        }

        if (this.password == "") {
            alert("Please enter password.");
            return false;
        }

        if (this.passwordRepeat != this.password) {
            alert("Passwords did not match.");
            return false;
        }

        return true;
    };
    return SignUpViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.SignUpViewModel = SignUpViewModel;
//# sourceMappingURL=sign-up-view-model.js.map

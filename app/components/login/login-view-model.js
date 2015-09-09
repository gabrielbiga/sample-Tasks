var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
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
                this.notifyPropertyChange("username", value);
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
                this.notifyPropertyChange("password", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    LoginViewModel.prototype.login = function () {
        var _this = this;
        if (this.validate()) {
            this.beginLoading();
            serviceModule.service.login(this.username, this.password).then(function (data) {
                navigationModule.navigateWitouthHistory(viewsModule.Views.main);
                _this.endLoading();
            }, function (error) {
                _this.clearPassword();
                _this.endLoading();
            });
        }
        else {
            this.clearPassword();
        }
    };
    LoginViewModel.prototype.signUp = function () {
        navigationModule.navigate(viewsModule.Views.signUp);
    };
    LoginViewModel.prototype.clearPassword = function () {
        this.password = "";
    };
    LoginViewModel.prototype.validate = function () {
        if (!this.username || this.username === "") {
            this.showError("Please enter username.");
            return false;
        }
        if (!this.password || this.password === "") {
            this.showError("Please enter password.");
            return false;
        }
        return true;
    };
    return LoginViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.LoginViewModel = LoginViewModel;

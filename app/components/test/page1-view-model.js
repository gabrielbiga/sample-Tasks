var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");
var resourcesModule = require("../../resources");
var Page1ViewModel = (function (_super) {
    __extends(Page1ViewModel, _super);
    function Page1ViewModel() {
        _super.call(this);
        this.item = { Title: "Alabala" };
    }
    Object.defineProperty(Page1ViewModel.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            if (this._item !== value) {
                this._item = value;
                this.notifyPropertyChanged("item", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page1ViewModel.prototype, "resources", {
        get: function () {
            return resourcesModule.resources;
        },
        enumerable: true,
        configurable: true
    });
    Page1ViewModel.prototype.notifyPropertyChanged = function (propertyName, value) {
        this.notify({ object: this, eventName: observableModule.Observable.propertyChangeEvent, propertyName: propertyName, value: value });
    };
    return Page1ViewModel;
})(observableModule.Observable);
exports.Page1ViewModel = Page1ViewModel;

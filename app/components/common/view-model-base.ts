import platformModule = require("platform");

import observableModule = require("data/observable");

import enumsModule = require("ui/enums");
import dialogsModule = require("ui/dialogs");

var stringsModule = require("../../resources/strings");

export class ViewModelBase extends observableModule.Observable {
    private _loadingCount: number;
    private _isLoading: boolean;

    constructor() {
        super();

        this._loadingCount = 0;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading != value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value);
        }
    }

    get androidVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.android) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get iosVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.ios) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get strings(): any {
        return stringsModule.strings;
    }

    beginLoading() {
        if (!this._loadingCount) {
            this.isLoading = true;
        }

        this._loadingCount++;
    }

    endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    }

    showError(error: string) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
    }

    showInfo(message: string) {
        dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
    }
}

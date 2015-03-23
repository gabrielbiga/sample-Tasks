import platformModule = require("platform");
import observableModule = require("data/observable");
import enumsModule = require("ui/enums");
import frameModule = require("ui/frame");

export class ViewModelBase extends observableModule.Observable {
    private _loadingCount: number;

    constructor() {
        super();
        this._loadingCount = 0;
    }

    get androidVisibility(): string {
        if (platformModule.device.os === ANDROID_OS_NAME) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get iosVisibility(): string {
        if (platformModule.device.os === IOS_OS_NAME) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    beginLoading() {
        if (!this._loadingCount) {
            this.set("isLoading", true);
        }

        this._loadingCount++;
    }

    endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this.loadingCount) {
                this.set("isLoading", false);
            }
        }
    }

    navigateTo(navigationContext: any) {
        var topmost = frameModule.topmost();
        topmost.navigate(navigationContext);
    }

    goBack() {
        var topmost = frameModule.topmost();
        topmost.goBack();
    }
}
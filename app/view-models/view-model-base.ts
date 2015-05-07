import platformModule = require("platform");
import observableModule = require("data/observable");
var viewModule = require("ui/core/view");
import enumsModule = require("ui/enums");
import frameModule = require("ui/frame");
import pageModule = require("ui/page");

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

    disableAutoCorrect(page: pageModule.Page, viewName: string) {
        /*
         * we will have cross-platform way to disable intellisense for the textfield in v1
         *
         * https://github.com/NativeScript/cross-platform-modules/issues/147
         * https://github.com/NativeScript/cross-platform-modules/issues/146
         *
         */
        if (platformModule.device.os === IOS_OS_NAME) {
            var view = viewModule.getViewById(page, "username");
            view.ios.autocorrectionType = UITextAutocorrectionType.UITextAutocorrectionTypeNo;
            view.ios.autocapitalizationType = UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
        }
    }

    navigateTo(navigationContext: any) {
        var topmost = frameModule.topmost();
        topmost.navigate(navigationContext);
    }

    navigateToAndClearHistory(navigationContext: any) {
        this.navigateTo(navigationContext);
    }

    goBack() {
        var topmost = frameModule.topmost();
        topmost.goBack();
    }
}
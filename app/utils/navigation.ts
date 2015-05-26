import frameModule = require("ui/frame");

export function navigate(navigationContext: any) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationContext);
}

export function navigateWitouthHistory(navigationContext: any) {
    this.navigate(navigationContext);
}

export function goBack() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}

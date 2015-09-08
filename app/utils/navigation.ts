import frameModule = require("ui/frame");

export function navigate(navigationEntry: frameModule.NavigationEntry) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
}

export function navigateWitouthHistory(navigationEntry: frameModule.NavigationEntry) {
    navigationEntry.backstackVisible = false;
    this.navigate(navigationEntry);
}

export function goBack() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}

var frameModule = require("ui/frame");
function navigate(navigationEntry) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
}
exports.navigate = navigate;
function navigateWitouthHistory(navigationEntry) {
    navigationEntry.backstackVisible = false;
    this.navigate(navigationEntry);
}
exports.navigateWitouthHistory = navigateWitouthHistory;
function goBack() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}
exports.goBack = goBack;

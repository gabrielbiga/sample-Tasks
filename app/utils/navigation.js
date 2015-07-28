var frameModule = require("ui/frame");
function navigate(navigationContext) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationContext);
}
exports.navigate = navigate;
function navigateWitouthHistory(navigationContext) {
    this.navigate(navigationContext);
}
exports.navigateWitouthHistory = navigateWitouthHistory;
function goBack() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}
exports.goBack = goBack;

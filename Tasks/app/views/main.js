var frameModule = require("ui/frame");
var localSettings = require("local-settings");
var gestures = require("ui/gestures");
var platformModule = require("platform");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");

var mainViewModelModule = require("../view-models/main-view-model")

var page;
var vm;
navigatedTo = function (args) {
    /*
     * By design (see "/app/res/Design/" folder) the actionBar should be visible in the "internal" pages of the app.
     *
     * So after we hide the appBar in the login page we are showing it again here.
     *
     * This code will be gone once we implement the proper abstraction for working with ActionBars
     * (coming soon - probably in v1 in May.2015);
     *
     */
    if (platformModule.device.os === ANDROID_OS_NAME) {
        frameModule.topmost().android.actionBar.show();
    }
}

exports.navigatedTo = navigatedTo;

pageLoaded = function(args) {
    page = args.object;
    vm = new mainViewModelModule.MainViewModel();
    page.bindingContext = vm;
}

exports.pageLoaded = pageLoaded;

function listViewItemTap(args) {
    vm.viewTask(args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;

function addTask(args) {
    vm.addTask();
}
exports.addTask = addTask;

function logout(args) {
    localSettings.remove(TOKEN_DATA_KEY);
    topMostFrame.navigate("app/views/login");
}
exports.logout = logout;
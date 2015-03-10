var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var mainViewModel = require("../view-models/mainViewModel")
var frameModule = require("ui/frame");
var localSettings = require("local-settings");
var gestures = require("ui/gestures");
var platformModule = require("platform");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");

var page;
var vm;
onNavigatedTo = function (args) {
    /*
     * By design (see "/app/res/Design/" folder) the actionBar should be visible in the "internal" pages of the app.
     *
     * So after we hide the appBar in the login page we are showing it again here.
     *
     * This code will be gone once we implement the proper abstraction for working with ActionBars
     * (coming soon - probably in v1 in May.2015);
     *
     */
    if (platformModule.device.os == ANDROID_OS_NAME) {
        frameModule.topmost().android.actionBar.show();
    }

    page = args.object;
    vm = new mainViewModel.mainViewModel();
    page.bindingContext = vm;
    initFAB();
}
exports.onNavigatedTo = onNavigatedTo;

function initFAB() {
    var FABContainer = page.getViewById("FABContainer");
    var addTaskButton= page.getViewById("addTaskButton");
    if (platformModule.device.os == ANDROID_OS_NAME) {
        // this code should be revisited
        var FABelement = page.getViewById("FAB");

        FABContainer.style.visibility = "visible";
        addTaskButton.style.visibility = "collapsed";
        var widthDIP = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
        var heightDIP = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
        var FABSize = 150;
        var FABMargin = 16;

        absoluteLayoutModule.AbsoluteLayout.setLeft(FABelement, widthDIP - 70 - FABMargin);
        absoluteLayoutModule.AbsoluteLayout.setTop(FABelement, heightDIP - 70 - FABSize - FABMargin);
    } else {
        FABContainer.style.visibility = "collapsed";
        addTaskButton.style.visibility = "visible";
    }
}

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
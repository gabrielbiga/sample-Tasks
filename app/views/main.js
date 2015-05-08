var frameModule = require("ui/frame");
var localSettingsModule = require("local-settings");
var platformModule = require("platform");

var mainViewModelModule = require("../view-models/main-view-model")

navigatedTo = function (args) {
    if (platformModule.device.os === ANDROID_OS_NAME) {
        frameModule.topmost().android.actionBar.show();
    }
}

exports.navigatedTo = navigatedTo;

var viewModel;
pageLoaded = function(args) {
    // see if the user is already logged and if no redirect him to the login page.
    var authToken = localSettingsModule.getString(TOKEN_DATA_KEY);
    if (!authToken) {
        var topmost = frameModule.topmost();
        topmost.navigate("app/views/login");
    } else {
        var page = args.object;
        viewModel = new mainViewModelModule.MainViewModel();
        page.bindingContext = viewModel;
    }
}

exports.pageLoaded = pageLoaded;

function listViewItemTap(args) {
    viewModel.viewTask(args.view.bindingContext);
}

exports.listViewItemTap = listViewItemTap;

function addTask(args) {
    viewModel.addTask();
}

exports.addTask = addTask;

function logout(args) {
    viewModel.logout();
}

exports.logout = logout;
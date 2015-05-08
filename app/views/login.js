var platformModule = require("platform");
var localSettingsModule = require("local-settings");
var frameModule = require("ui/frame");

var loginViewModelModule = require("../view-models/login-view-model")

// this handler is defined in the XML
navigatedTo = function (args) {
    /*
     * By design (see "/app/res/Design/" folder) there shouldn't be an actionBar in Android on the login page.
     *
     * We have this code below because the actionBar abstraction in NativeScript is still not ready.
     *
     * This code will be gone once we implement the proper abstraction for working with ActionBars
     * (coming soon - probably in v1 in May.2015);
     *
     */
    if (platformModule.device.os === ANDROID_OS_NAME) {
        /*
         * By using ".android", or ".ios" properties in any of the cross-platform
         * abstraction you get direct access to the native elements and you can use
         * their native API.
         *
         * For example this code below is directly taken from the Android actionBar API - 
         * http://stackoverflow.com/questions/8500283/how-to-hide-action-bar-before-activity-is-created-and-then-show-it-again
         *
         */
        frameModule.topmost().android.actionBar.hide();
    }
}

/*
 *
 * Use exports in order this method to be accessible from XML. 
 * If you don't need it in the XML - you don't need to export it.
 *
 */
exports.navigatedTo = navigatedTo;

var viewModel;

function pageLoaded(args) {
    var page = args.object;
    viewModel = new loginViewModelModule.LoginViewModel();
    page.bindingContext = viewModel;
    
    viewModel.disableAutoCorrect(page, "username");
}

exports.pageLoaded = pageLoaded;

function loginTap(args) {
    viewModel.login();
}

exports.loginTap = loginTap;

function registerTap(args) {
    viewModel.signUp();
}

exports.registerTap = registerTap;
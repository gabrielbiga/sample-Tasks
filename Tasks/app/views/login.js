var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var app = require("application");
var localSettings = require("local-settings");
var platformModule = require("platform");

// this handler is defined in the XML
onNavigatedTo = function (args) {
    
    /*
     * By design (see "/app/res/Design/" folder) there shouldn't be an actionBar in Android on the login page.
     *
     * We have this code below because the actionBar abstraction in NativeScript is still not ready.
     *
     * This code will be gone once we implement the proper abstraction for working with ActionBars
     * (coming soon - probably in v1 in May.2015);
     *
     */
    if (platformModule.device.os == ANDROID_OS_NAME) {
        
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
exports.onNavigatedTo = onNavigatedTo;

var page;
function pageLoaded(args) {
    page = args.object;
    global.topMostFrame = frameModule.topmost();
    
    // see if the user is already logged and if so redirect him to the main page.
    var authToken = localSettings.getString(TOKEN_DATA_KEY);
    if (authToken) {
        frameModule.topmost().navigate("app/views/main");
        return;
    }
    
    /*
     * we will have cross-platform way to disable intellisense for the textfield in v1
     *
     * https://github.com/NativeScript/cross-platform-modules/issues/147
     * https://github.com/NativeScript/cross-platform-modules/issues/146
     *
     */    
    if (platformModule.device.os == IOS_OS_NAME) 
    {
        var usernameField = view.getViewById(page, "username");
        usernameField.ios.autocorrectionType = UITextAutocorrectionType.UITextAutocorrectionTypeNo;
        usernameField.ios.autocapitalizationType = UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
    }
}
exports.pageLoaded = pageLoaded;

function loginTap(args) {
    var usernameField = view.getViewById(page, "username");
    if (usernameField.text == "") {
        alert("Please enter username.");
        return;
    }

    var passwordField = view.getViewById(page, "password");
    if (passwordField.text == "") {
        alert("Please enter password.");
        return;
    }

    /*
     * Everlive is the SDK of the BAAS we are using as part of the
     * Telerik Platform. (see more here: http://platform.telerik.com)
     * 
     * For more info on what this SDK offers - http://docs.telerik.com/platform/backend-services/what-are-telerik-backend-services
     *
     * You can use any other JavaScript or native SDKs with NativeScript.
     */
    var el = new everlive(global.TELERIK_BAAS_KEY);
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;

    el.Users.login(usernameField.text,
        passwordField.text,
        function (data) {
            activityIndicator.busy = false;
            saveToken(data.result.access_token);
            frameModule.topmost().navigate("app/views/main");
        },
        function (error) {
            activityIndicator.busy = false;
            
            /*
             * Here you can see a more advanced usage of the dialogs.alert.
             * You can specify the dialog header and the string used for the OK button.
             * 
             * For more options you can check the docs - http://docs.nativescript.org/ui-dialogs
             */
            alert({
                title: "Error logging you in!",
                message: error.message,
                okButtonText: "Close"
            });
        }
    );
}
exports.loginTap = loginTap;

function registerTap(args) {
    frameModule.topmost().navigate("app/views/signUp");
}
exports.registerTap = registerTap;

function saveToken(token) {
    localSettings.setString("authenticationToken", token);
}
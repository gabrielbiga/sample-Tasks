var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var app = require("application");
var localSettings = require("local-settings");

app.onUncaughtError = function (error) {
    dialogs.alert("Uncaught error[" + error +"]")
}

var page;
function pageLoaded(args) {
    page = args.object;
    global.topMostFrame = frameModule.topmost();
    var authToken = localSettings.getString(TOKEN_DATA_KEY);
    if (authToken)
    {
        frameModule.topmost().navigate("app/main-page");
    }    
}

exports.pageLoaded = pageLoaded;

function loginTap(args) {
   var usernameField = view.getViewById(page, "username");
    if (usernameField.text == "") {
        dialogs.alert("Please enter username.");
        return;
    }
    
    var passwordField = view.getViewById(page, "password");
    if (passwordField.text == "") {
        dialogs.alert("Please enter password.");
        return;        
    }
    
    var el = new everlive(global.TELERIK_BAAS_KEY);
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy=true;
    
    el.Users.login(usernameField.text, // username
                    passwordField.text, // password
                    function (data) {
                        activityIndicator.busy=false;
                        saveToken(data.result.access_token);

                        frameModule.topmost().navigate("app/main-page");
                    },
                    function(error){
                        activityIndicator.busy=false;
                        dialogs.alert(JSON.stringify(error));
                    }
    );

}
exports.loginTap = loginTap;

function registerTap(args) {
    frameModule.topmost().navigate("app/views/editUser");
}
exports.registerTap = registerTap;

function saveToken(token)
{
    localSettings.setString("authenticationToken", token);
}

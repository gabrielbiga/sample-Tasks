var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");

var page;
var originalUserInfo;
function pageLoaded(args) {
    page = args.object;
    if (localSettings.getString(TOKEN_DATA_KEY)) {
        var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
        el.Users.currentUser()
            .then(function (data) {
                page.bindingContext = data.result;
                originalUserInfo = data.result;
            },
            function(error){
                alert(JSON.stringify(error));
            });
    }
}
exports.pageLoaded = pageLoaded;

function onSaveButtonTap(args) {
    
    var nameField = view.getViewById(page, "name");
    var name = nameField.text;
    if (name == "") {
        dialogs.alert("Please enter your name.");
        return;        
    }
    
    
    var emailField = view.getViewById(page, "email");
    var email = emailField.text;
    if (email == "") {
        dialogs.alert("Please enter your email.");
        return;        
    }

    var usernameField = view.getViewById(page, "username");
    var username = usernameField.text;
    if (username == "") {
        dialogs.alert("Please enter username.");
        return;
    }
    
    var passwordField = view.getViewById(page, "password");
    var password = passwordField.text;
    if (!originalUserInfo && password == "") {
        dialogs.alert("Please enter password.");
        return;        
    }
    
    var passwordRepeatField = view.getViewById(page, "passwordRepeat");
    if (passwordRepeatField.text != password) {
        dialogs.alert("Passwords did not match.");
        return;        
    }
    
    if (originalUserInfo && password != "")
    {
        var activityIndicator = view.getViewById(page, "activityIndicator");
        activityIndicator.busy = true;
         var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
         el.Users.changePassword(originalUserInfo.username, // username
            originalUserInfo.password, // password
            password, // new password
            true, // keep user's tokens
            function (data) {
               activityIndicator.busy = false;
               saveUserInfo(name, email, username, password);
            },
            function(error){
                alert(JSON.stringify(error));
            });
    } else 
    {
         saveUserInfo(name, email, username, password);
    }
    
}
exports.onSaveButtonTap = onSaveButtonTap;

function saveUserInfo(name, email, username, password) {
    var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;

    var attrs = {
        Email: email,
        DisplayName: name
    };

    if (!originalUserInfo) {
        el.Users.register(username,
            password,
            attrs,
            function(data) {
                 activityIndicator.busy = false;
                 onUserUpdated();             
            },
            function(error) {
                activityIndicator.busy = false;
                dialogs.alert(JSON.stringify(error));
            });    
    } 
    else 
    {
        attrs.Id = originalUserInfo.Id;
        el.Users.updateSingle(attrs,
            function(data){
                activityIndicator.busy = false;
                onUserUpdated();
            },
            function(error){
                alert(JSON.stringify(error));
            });
    }
}


function onUserUpdated()
{
    frameModule.topmost().goBack();
}

function onCancelButtonTap(args) {
    frameModule.topmost().goBack();
}
exports.onCancelButtonTap = onCancelButtonTap;

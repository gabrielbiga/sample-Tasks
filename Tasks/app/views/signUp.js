var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");

var page;
function onNavigatedTo(args) {
    page = args.object;
}
exports.onNavigatedTo = onNavigatedTo;

function onSaveButtonTap(args) {

    var nameField = view.getViewById(page, "name");
    var name = nameField.text;
    if (name == "") {
        alert("Please enter your name.");
        return;
    }

    var emailField = view.getViewById(page, "email");
    var email = emailField.text;
    if (email == "") {
        alert("Please enter your email.");
        return;
    }

    var usernameField = view.getViewById(page, "username");
    var username = usernameField.text;
    if (username == "") {
        alert("Please enter username.");
        return;
    }

    var passwordField = view.getViewById(page, "password");
    var password = passwordField.text;
    if (password == "") {
        alert("Please enter password.");
        return;
    }

    var passwordRepeatField = view.getViewById(page, "passwordRepeat");
    if (passwordRepeatField.text != password) {
        alert("Passwords did not match.");
        return;
    }
    var el = new everlive({
        apiKey: TELERIK_BAAS_KEY,
        token: localSettings.getString(TOKEN_DATA_KEY)
    });
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;

    var attrs = {
        Email: email,
        DisplayName: name
    };

    el.Users.register(username,
        password,
        attrs,
        function (data) {
            activityIndicator.busy = false;
            alert({
                title: "Registration sucess!",
                message: "Please login with your credentials now.",
                okButtonText: "Close"
            });
            frameModule.topmost().goBack();
        },
        function (error) {
            activityIndicator.busy = false;
            alert({
                title: "Registration problem!",
                message: error.message,
                okButtonText: "Close"
            });
        });
}
exports.onSaveButtonTap = onSaveButtonTap;

function onCancelButtonTap(args) {
    frameModule.topmost().goBack();
}
exports.onCancelButtonTap = onCancelButtonTap;
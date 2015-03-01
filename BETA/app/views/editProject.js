var everlive = require("../lib/everlive.js");
var application = require("application");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");

var page;
function pageLoaded(args) {
    page = args.object;
    //createReminder();
}
exports.pageLoaded = pageLoaded;

function saveProject(args) {
    
    var nameField = view.getViewById(page, "name");
    if (nameField.text == "") {
        dialogs.alert("Please enter project name.");
        return;        
    }    

    var el = new everlive({
                            apiKey : global.TELERIK_BAAS_KEY,
                            token : localSettings.getString(TOKEN_DATA_KEY)
    });
    
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;

    el.data('Project').create({ Name : nameField.text },
        function(data) {
            dialogs.alert(JSON.stringify(data));
            frameModule.topmost().navigate("app/views/main");
        },
        function(error) {
            dialogs.alert(JSON.stringify(error));
        });    
}
exports.saveProject = saveProject;

function cancel(args) {
    frameModule.topmost().navigate("app/views/main");
}
exports.cancel = cancel;

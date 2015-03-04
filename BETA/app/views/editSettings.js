var everlive = require("../lib/everlive");
var application = require("application");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
////// TODO - need to think how (when and where) we can create the default settings
var page;
var taskId;
function pageLoaded(args) {
    page = args.object;
    
    loadSettings();
}
exports.pageLoaded = pageLoaded;

function loadSettings()
{
    var el = new everlive({
        apiKey : global.TELERIK_BAAS_KEY,
        token : localSettings.getString(TOKEN_DATA_KEY)
    });
    
    el.data('TasksApplicationSettings').get()
    .then(function(data){
        if (data.result.count == 0) {
            createDefaultSettings();
        } else {
            page.bindingContext = data.result[0];    
        }        
    },
    function(error){
        alert("Error ->" + JSON.stringify(error));
    });
}

function saveSettings(args) {
    
    var nameField = view.getViewById(page, "name");
    if (nameField.text == "") {
        dialogs.alert("Please enter task name.");
        return;        
    }    

    var el = new everlive({
                            apiKey : global.TELERIK_BAAS_KEY,
                            token : localSettings.getString(TOKEN_DATA_KEY)
    });
    
    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;
      
    if (!taskId)
    {
        el.data('Task').create({ Name : nameField.text },
            function(data){
                frameModule.topmost().navigate("app/views/main");
            },
            function(error){
                dialogs.alert(JSON.stringify(error));
            });    
    } 
    else 
    {
        el.data('Task').updateSingle({ Id:taskId, Name : nameField.text },
            function(data){
                frameModule.topmost().navigate("app/views/main");
            },
            function(error){
                dialogs.alert(JSON.stringify(error));
            });   
        
    }
}
exports.saveSettings = saveSettings;

function cancel(args) {
    frameModule.topmost().navigate("app/views/main");
}
exports.cancel = cancel;

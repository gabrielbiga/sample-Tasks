var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");

var page;
function pageLoaded(args) {
    page = args.object;  
    loadProject();
}
exports.pageLoaded = pageLoaded;

function loadProject() {
        var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
    el.data('Project').getById(localSettings.getString(PROJECT_ID_DATA_KEY))
    .then(function(data){
        var project = page.bindingContext = data.result;
        loadTasksForProject(project.Id);
    },
    function(error){
        alert(JSON.stringify(error));
    });
}

function loadTasksForProject(projectId)
{
    var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
    var taskListView = view.getViewById(page, "taskList");   
    try {
        
    var filter = { 
    "ProjectId": projectId
};
        

    el.data('Task').get(filter).then(function(data) {
        taskListView.items = data.result;        
    }, function(err) {
        dialogs.alert('Error = ' + JSON.stringify(err)); // this will be fired, if you don’t have Wi-Fi enabled on the Phone
    });  
    }catch (e ){
        alert("Errror[" + e+ "]")
        
    }
}

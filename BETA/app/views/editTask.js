var everlive = require("../lib/everlive.js");
var application = require("application");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");

var page;
var taskId;
function pageLoaded(args) {
    page = args.object;
    
    taskId = localSettings.getString(TASK_ID_DATA_KEY);
    if (taskId)
    {
        showTask();
    }
    localSettings.remove(TASK_ID_DATA_KEY);
}
exports.pageLoaded = pageLoaded;

var selectedProjectId;
function onProjectSelected (args) {
    var selectedProject = args.view.bindingContext;
    selectedProjectId = selectedProject.Id;
    alert("Project Id [" + selectedProjectId + "]")
    
}
exports.onProjectSelected = onProjectSelected;

function viewProject (args) {
    localSettings.setString(PROJECT_ID_DATA_KEY, selectedProjectId);
        frameModule.topmost().navigate("app/views/viewProject");
}
exports.viewProject = viewProject;

function showTask()
{
     var el = new everlive({
                            apiKey : global.TELERIK_BAAS_KEY,
                            token : localSettings.getString(TOKEN_DATA_KEY)
    });
    
    el.data('Task').getById(localSettings.getString(TASK_ID_DATA_KEY))
    .then(function(data){
        var task = page.bindingContext = data.result;
        selectedProjectId = task.ProjectId;
    },
    function(error){
        alert("Error ->" + JSON.stringify(error));
    });
    
    var projectListView = view.getViewById(page, "projectList");
    el.data('Project').get().then(function(data) {
        projectListView.items = data.result;        
    }, function(err) {
        dialogs.alert('Error = ' + JSON.stringify(err)); // this will be fired, if you don’t have Wi-Fi enabled on the Phone
    });
}

function saveTask(args) {
    
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
//    alert("TaskId is [" + taskId + "]");
  if (!taskId)
    {
        el.data('Task').create({ Name : nameField.text, ProjectId : selectedProjectId },
            function(data){
                frameModule.topmost().navigate("app/views/main");
            },
            function(error){
                dialogs.alert(JSON.stringify(error));
            });    
    } else 
    {
        el.data('Task').updateSingle({ Id:taskId, Name : nameField.text, ProjectId : selectedProjectId },
            function(data){
                frameModule.topmost().navigate("app/views/main");
            },
            function(error){
                dialogs.alert(JSON.stringify(error));
            });   
        
    }
}
exports.saveTask = saveTask;

function cancel(args) {
    frameModule.topmost().navigate("app/views/main");
}
exports.cancel = cancel;

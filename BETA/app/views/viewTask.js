var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var observable = require("data/observable");
var viewTaskVM = require("../view-models/viewTaskViewModel")

var page;
var vm={};
function pageLoaded(args) {
    page = args.object;  
    
    var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
    el.data('Task').getById(localSettings.getString(TASK_ID_DATA_KEY)).then(
        function(data) {
            vm.task = data.result;            
            vm.ProjectName = "to do";
            vm.DueDateText = "12-March";
            vm.ReminderText = "5 minutes before";
            page.bindingContext = vm;
        },
        function(error) {
            alert(JSON.stringify(error));
        });
}
exports.pageLoaded = pageLoaded;

function onDeleteButtonTap(args) 
{
    dialogs.confirm("Are you sure you want to delete task?").then(function (result) {
        if (!result) return;

        var activityIndicator = view.getViewById(page, "activityIndicator");
        activityIndicator.busy = true;
        
        var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});

        // TODO: delete do not work.
        el.data('Task').destroy({ Id: localSettings.getString(TASK_ID_DATA_KEY) },
            function(data) {
                activityIndicator.busy = false;
                topMostFrame.navigate("app/views/main");
            },
            function(error){
                activityIndicator.busy = false;
                alert("Error deleting Task:[" + localSettings.getString(TASK_ID_DATA_KEY) + "][" + JSON.stringify(error) + "]");
            });
    });
}
exports.onDeleteButtonTap = onDeleteButtonTap;

onCompleteButtonTap
function onEditButtonTap(args) {
    topMostFrame.navigate("app/views/editTask");   
}

exports.onEditButtonTap = onEditButtonTap;

function onCompleteButtonTap(args) {
    // todo
}

exports.onCompleteButtonTap = onCompleteButtonTap;

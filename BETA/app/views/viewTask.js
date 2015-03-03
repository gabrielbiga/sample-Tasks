var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var observable = require("data/observable");
var viewTaskVM = require("../view-models/viewTaskViewModel")

var vm = {};
var page;
onNavigatedTo = function (args)
{
    page = args.object;

    vm.task = page.navigationContext;            
    vm.ProjectName = "to do";
    vm.DueDateText = "12-March";
    vm.ReminderText = "5 minutes before";
    page.bindingContext = vm;
}
exports.onNavigatedTo = onNavigatedTo;

function onDeleteButtonTap(args) 
{
    dialogs.confirm("Are you sure you want to delete task?").then(function (result) {
        
        if (!result) return;

        var activityIndicator = view.getViewById(page, "activityIndicator");
        activityIndicator.busy = true;
        
        var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});

        // TODO: delete do not work.
        el.data('Task').destroySingle({ Id: vm.task.Id },
            function(data) {
                activityIndicator.busy = false;
                topMostFrame.navigate("app/views/main");
            },
            function(error){
                activityIndicator.busy = false;
                alert("Error deleting Task:[" + JSON.stringify(error) + "]");
            });
    });
}
exports.onDeleteButtonTap = onDeleteButtonTap;

function onEditButtonTap(args) {
    var navigationEntry = 
        {
            context : vm.task,
            moduleName: "app/views/editTask"
        };
    topMostFrame.navigate(navigationEntry);   
}

exports.onEditButtonTap = onEditButtonTap;

function onCompleteButtonTap(args) {
    // todo
}

exports.onCompleteButtonTap = onCompleteButtonTap;

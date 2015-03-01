var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var observable = require("data/observable");
var viewTaskVM = require("../view-models/viewTaskViewModel")

var page;
var vm;
function pageLoaded(args) {
    page = args.object;  
    var vm = new viewTaskVM.viewTaskViewModel();
    vm.addEventListener(observable.knownEvents.propertyChange, 
        function (pcd) {
            alert(pcd.eventName.toString() + " " + pcd.propertyName.toString() + " " + pcd.value.toString());
        }
    );

    page.bindingContext = vm;
}
exports.pageLoaded = pageLoaded;

function onDeleteButtonClick(args) 
{
    dialogs.confirm("Are you sure you want to delete task?").then(function (result) {
        if (result) 
        {
            
            var activityIndicator = view.getViewById(page, "activityIndicator");
            activityIndicator.busy = true;
            var el = new everlive({ apiKey: TELERIK_BAAS_KEY, token : localSettings.getString(TOKEN_DATA_KEY)});
            el.data('Task').destroySingle({ Id: localSettings.getString(TASK_ID_DATA_KEY) },
                function() {
                    activityIndicator.busy = false;
                    topMostFrame.navigate("app/views/main");
                },
                function(error){
                    activityIndicator.busy = false;
                    alert(JSON.stringify(error));
                });
        }
    });
}
exports.onDeleteButtonClick = onDeleteButtonClick;

function onEditButtonClick(args) {
    topMostFrame.navigate("app/views/editTask");   
}

exports.onEditButtonClick = onEditButtonClick;

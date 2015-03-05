var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var observable = require("data/observable");
var viewTaskVM = require("../view-models/viewTaskViewModel")
var platformModule = require("platform");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");

var vm = {};
var page;
onNavigatedTo = function (args) {
    page = args.object;
    vm.task = page.navigationContext;
    vm.task.hasPhoto = false;
    
    if (taskHasPhoto()) {
        
        var activityIndicator = view.getViewById(page, "activityIndicator");
        activityIndicator.busy = true;
        
        var el = new everlive({
            apiKey: TELERIK_BAAS_KEY,
            token: localSettings.getString(TOKEN_DATA_KEY)
        });

        vm.httpRequestRunning = true;
        el.Files.getDownloadUrlById(vm.task.Photo)
            .then(function (downloadUrl) {
                    page.getViewById("image").url = downloadUrl;
                    activityIndicator.busy = false;
                },
                function (error) {
                    alert("Error loading image:[" + error.message + "]");
                    activityIndicator.busy = false;
                });
        vm.task.hasPhoto = true;
    }

    /*
     * Just for the sake of good design add these static properties here.
     * In the following iterations we will enable this functionality.
     * Follow our blog posts here - https://www.nativescript.org/blog and on twitter @NativeScript.
     */
    vm.ProjectName = "to do";
    vm.DueDateText = "12-March";
    vm.ReminderText = "5 minutes before";
    page.bindingContext = vm;
    initFAB();
}
exports.onNavigatedTo = onNavigatedTo;

function initFAB() {

    // this code needs revisiting
    var FABelement = page.getViewById("FAB");
    var widthDIP = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var heightDIP = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    var FABSize = 150;
    var FABMargin = 16;

    absoluteLayoutModule.AbsoluteLayout.setLeft(FABelement, widthDIP - 70 - FABMargin);
    absoluteLayoutModule.AbsoluteLayout.setTop(FABelement, heightDIP - 70 - FABSize - FABMargin);
}

function taskHasPhoto() {
    var photoId = vm.task.Photo;
    if (!photoId || photoId.indexOf("000") > -1) {
        return false;
    }

    return true;
}

function onDeleteButtonTap(args) {
    
    dialogs.confirm("Are you sure you want to delete task?").then(function (result) {

        if (!result) return;

        var activityIndicator = view.getViewById(page, "activityIndicator");
        activityIndicator.busy = true;
        
        var el = new everlive({
            apiKey: TELERIK_BAAS_KEY,
            token: localSettings.getString(TOKEN_DATA_KEY)
        });

        el.data('Task').destroySingle({
                Id: vm.task.Id
            },
            function (data) {
                activityIndicator.busy = false;
                topMostFrame.navigate("app/views/main");
            },
            function (error) {
                activityIndicator.busy = false;
                alert("Error deleting Task:[" + error.message + "]");
            });
    });
}
exports.onDeleteButtonTap = onDeleteButtonTap;

function onEditButtonTap(args) {

    /*
     * This is how you pass and argument to the next page.
     * For more options pls visit the documentation article  - http://docs.nativescript.org/navigation#navigation
     */
    var navigationEntry = {
        context: vm.task,
        moduleName: "app/views/editTask"
    };
    topMostFrame.navigate(navigationEntry);
}
exports.onEditButtonTap = onEditButtonTap;

function onCompleteButtonTap(args) {
    alert("This functionality will be implemented in the next version!")
}
exports.onCompleteButtonTap = onCompleteButtonTap;
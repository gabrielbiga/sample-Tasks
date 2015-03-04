var everlive = require("../lib/everlive");
var dialogs = require("ui/dialogs");
var mainViewModel = require("../view-models/mainViewModel")
var frameModule = require("ui/frame");
var localSettings = require("local-settings");
var gestures = require("ui/gestures");
var platformModule = require("platform");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");

var page;
var vm;
onNavigatedTo = function (args) {
    frameModule.topmost().android.actionBar.show();
    page = args.object;
    //getBackendData();
    vm = new mainViewModel.mainViewModel();
    page.bindingContext = vm;
    initFAB();

}
exports.onNavigatedTo = onNavigatedTo;

pageLoaded = function (args) {
    //initFAB();
}
exports.pageLoaded = pageLoaded;

function initFAB() {
    
    var FABelement = page.getViewById("FAB");
    var widthDIP = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var heightDIP = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    var FABSize = 150;
    var FABMargin = 16;
    
    absoluteLayoutModule.AbsoluteLayout.setLeft(FABelement, widthDIP - 70 - FABMargin);
    absoluteLayoutModule.AbsoluteLayout.setTop(FABelement, heightDIP - 70- FABSize - FABMargin);
    
    FABelement.observe(gestures.GestureTypes.Tap, function (args) {
        addTask(args);
    });
}

function listViewItemTap(args) {
    vm.viewTask(args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;

/*
    TODO refactor all these methods below to bind directly to the VM
*/
function addTask(args) {
    vm.addTask();
}
exports.addTask = addTask;

function editUser(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/editUser");
}
exports.editUser = editUser;

function addProject(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/editProject");
}
exports.addProject = addProject;

function logout(args) {
    localSettings.remove(TOKEN_DATA_KEY);
    topMostFrame.navigate("app/views/login");
}
exports.logout = logout;
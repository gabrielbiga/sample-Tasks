var everlive = require("../lib/everlive.js");
var dialogs = require("ui/dialogs");
var mainViewModel = require("../view-models/mainViewModel")
var frameModule = require("ui/frame");
var localSettings = require("local-settings");

var page;
var vm;
function pageLoaded(args) {
    page = args.object;
    //getBackendData();
    vm = new mainViewModel.mainViewModel();
    page.bindingContext = vm;
}
exports.pageLoaded = pageLoaded;

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
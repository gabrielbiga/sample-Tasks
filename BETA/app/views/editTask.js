var everlive = require("../lib/everlive.js");
var application = require("application");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var camera = require("camera");

var isNewTask = true;
var task;
var page;
onNavigatedTo = function (args) {
    page = args.object;
    task = page.navigationContext;
    if (task.Id) isNewTask = false;
    task.ProjectName = PROJECT_NAME;
    task.listItems = ["uno", "due", "tre"];
    page.bindingContext = task;

}
exports.onNavigatedTo = onNavigatedTo;

function saveTask(args) {

    var nameField = view.getViewById(page, "name");
    if (nameField.text == "") {
        dialogs.alert("Please enter task name.");
        return;
    }

    var emailField = view.getViewById(page, "email");
    var urlField = view.getViewById(page, "url");
    var notesField = view.getViewById(page, "notes");

    var el = new everlive({
        apiKey: global.TELERIK_BAAS_KEY,
        token: localSettings.getString(TOKEN_DATA_KEY)
    });

    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;
    //    alert("TaskId is [" + taskId + "]");

    if (imgSource) {

    }

    if (isNewTask) {
        el.data('Task').create({
                Name: nameField.text,
                Email: emailField.text,
                Url: urlField.text,
                Notes: notesField.text
            },
            function (data) {
                frameModule.topmost().navigate("app/views/main");
            },
            function (error) {
                dialogs.alert(JSON.stringify(error));
            });
    } else {
        el.data('Task').updateSingle({
                Id: task.Id,
                Name: nameField.text,
                Email: emailField.text,
                Url: urlField.text,
                Notes: notesField.text
            },
            function (data) {
                frameModule.topmost().navigate("app/views/main");
            },
            function (error) {
                dialogs.alert(JSON.stringify(error));
            });

    }
}
exports.saveTask = saveTask;

function cancel(args) {
    frameModule.topmost().goBack();
}
exports.cancel = cancel;
var imgSource;

function onUploadPictureTap(args) {

    var el = new everlive({
        apiKey: global.TELERIK_BAAS_KEY,
        token: localSettings.getString(TOKEN_DATA_KEY)
    });

    var file = {
        "Filename": "NativeScriptIsAwesome.jpg",
        "ContentType": "image/jpeg",
        "base64": imgSource.toBase64String("JPEG", 100)
    };

    el.Files.create(file,
        function (data) {
            alert("File " + JSON.stringify(data) + "added.");
        page.getViewById("img").url = data.result.Uri;
        
        },
        function (error) {
            alert("error adding image[" + JSON.stringify(error) + "]")
        });
}
exports.onUploadPictureTap = onUploadPictureTap;

function onTakePictureTap(args) {
    camera.takePicture().then(function (result) {
        imgSource = result;
        page.getViewById("img").source = result;
        //alert(JSON.stringify(result));


    });
}
exports.onTakePictureTap = onTakePictureTap;
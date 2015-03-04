var everlive = require("../lib/everlive.js");
var application = require("application");
var dialogs = require("ui/dialogs");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
var camera = require("camera");
var gestures = require("ui/gestures");

var isNewTask = false;
var task;
var page;
var imgSource;
    var el = new everlive({
        apiKey: global.TELERIK_BAAS_KEY,
        token: localSettings.getString(TOKEN_DATA_KEY)
    });
onNavigatedTo = function (args) {
    page = args.object;
    task = page.navigationContext;
    if (!task) {
        isNewTask = true;
        task = {};
    }
    
    task.ProjectName = PROJECT_NAME;
    task.listItems = ["uno", "due", "tre"];
    page.bindingContext = task;

    page.getViewById("photoPicker").observe(gestures.GestureTypes.Tap, function (args) {
        takePicture();
    });
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



    var activityIndicator = view.getViewById(page, "activityIndicator");
    activityIndicator.busy = true;
    //    alert("TaskId is [" + taskId + "]");
    var taskData = {
        Name: nameField.text,
        Email: emailField.text,
        Url: urlField.text,
        Notes: notesField.text
    };
    if (imgSource) {
        var file = {
            "Filename": "NativeScriptIsAwesome.jpg",
            "ContentType": "image/jpeg",
            "base64": imgSource.toBase64String("JPEG", 100)
        };

        el.Files.create(file,
            function (data) {
                taskData.Photo = data.result.Id;
                saveTaskData(taskData);
            },
            function (error) {
                alert("error adding image[" + JSON.stringify(error) + "]")
            });
    } else {
        saveTaskData(taskData)
    }
}
exports.saveTask = saveTask;

function saveTaskData(taskData){
    
    if (isNewTask) {
                    el.data('Task').create(taskData,
                        function (data) {
                            frameModule.topmost().navigate("app/views/main");
                        },
                        function (error) {
                            dialogs.alert(JSON.stringify(error));
                        });
                } else {
                    taskData.Id = task.Id
                    el.data('Task').updateSingle(taskData,
                        function (data) {
                            frameModule.topmost().navigate("app/views/main");
                        },
                        function (error) {
                            dialogs.alert(JSON.stringify(error));
                        });

                }

}


function cancel(args) {
    frameModule.topmost().goBack();
}
exports.cancel = cancel;


function takePicture() {
    camera.takePicture().then(function (result) {
        imgSource = result;
        page.getViewById("img").source = result;
    });
}

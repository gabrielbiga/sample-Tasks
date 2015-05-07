import cameraModule = require("camera");
import localSettings = require("local-settings");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import everliveModule = require("../lib/everlive");

import taskViewModelBaseModule = require("./task-view-model-base");

export class EditTaskViewModel extends taskViewModelBaseModule.TaskViewModelBase {
    private _everlive: any;
    private _picture: imageSourceModule.ImageSource;
    
    constructor(task: any) {
        super(task);

        this._everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
    }

    get picture(): imageSourceModule.ImageSource {
        return this._picture;
    }

    set picture(value: imageSourceModule.ImageSource) {
        if (this._picture !== value) {
            this._picture = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "picture", value: value });
        }
    }

    save() {
        if (this.validate()) {
            if (this.picture) {
                var that = this;
                that.beginLoading();
                var file = {
                    "Filename": "NativeScriptIsAwesome.jpeg",
                    "ContentType": "image/jpeg",
                    "base64": that.picture.toBase64String(imageSourceModule.ImageFormat.JPEG, 100)
                };

                that._everlive.Files.create(file,
                    function(data) {
                        that.task.Photo = data.result.Id;
                        that.saveTaskData();
                        that.endLoading();
                    },
                    function(error) {
                        that.endLoading();
                        alert("Error uploading image[" + error.message + "]")
            });
            } else {
                this.saveTaskData()
            }
        }
    }

    cancel() {
        this.goBack();        
    }

    takePicture() {
        var that = this;
        cameraModule.takePicture().then((result: imageSourceModule.ImageSource) => {
            that.picture = result;
        });
    }

    private saveTaskData() {
        if (this.task.Id) {
            this.updateTask();
        } else {
            this.createTask();
        }
    }

    private createTask() {
        var that = this;
        that.beginLoading();
        that._everlive.data('Task').create(that.task, function(data) {
            that.endLoading();
            that.navigateTo("app/views/main");
        }, function(error) {
                that.endLoading();
                alert("Error creating task [" + error.message + "]");
            });

    }

    private updateTask() {
        var that = this;
        that.beginLoading();
        that._everlive.data('Task').updateSingle(that.task,
            function(data) {
                that.endLoading();
                that.navigateTo("app/views/main");
            },
            function(error) {
                that.endLoading();
                alert("Error updating task [" + error.message + "]");
            });
    }

    private validate(): boolean {
        if (this.task.Name === "") {
            alert("Please enter task name.");
            return false;
        }

        return true;
    }
}
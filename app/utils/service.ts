import applicationSettingsModule = require("application-settings");

import constantsModule = require("./constants");
import notificationsModule = require("./notifications");

var everliveModule = require("../lib/everlive");

var TASK = "Task";

export class Service {
    private _everlive: any;

    get isAuthenticated(): boolean {
        return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }

    login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password,(data: any) => {
                this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    logout() {
        this.clearLocalSettings();
        this.clearEverlive();
    }

    signUp(username: string, password: string, additionalData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Users.currentUser().then((data) => {
                resolve(data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    clearEverlive() {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    }

    getTasks(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).get().then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    createTask(task: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).create(task, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    updateTask(task: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).updateSingle(task, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    deleteTask(task: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).destroySingle({ Id: task.Id }, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getDownloadUrlFromId(fileId: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Files.getDownloadUrlById(fileId).then(url => {
                console.log("READY: " + url);
                resolve(url);
            }, error => {
                    console.log("INNER ERROR: ");
                    Service.showErrorAndReject(error, reject);
                });
        });
    }

    private createEverlive(): any {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }

        return this._everlive;
    }

    private static showErrorAndReject(error: any, reject: (e: any) => void) {
        notificationsModule.showError(error.message);
        reject(error);
    }

    private setupLocalSettings(authenticationTokenKey: string) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
    }

    private clearLocalSettings() {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
    }
}

export var service = new Service();
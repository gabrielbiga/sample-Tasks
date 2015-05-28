import applicationSettingsModule = require("application-settings");

import constantsModule = require("./constants");
import notificationsModule = require("./notifications");

var everliveModule = require("../lib/everlive");

var TASK = "Task";
var DUE_DATE = "DueDate";

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

    getOverdueTasks(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

        return this.getTasksBefore(start);
    }

    getTasksForToday(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 1);

        return this.getTasksBetween(start, end);
    }

    getTasksForTomorrow(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        start.setDate(start.getDate() + 1);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 2);

        return this.getTasksBetween(start, end);
    }

    getTasksAfterTomorrow(): Promise<any[]> {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + 2);

        return this.getTasksAfter(date);
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

    private getTasksBetween(start: Date, end: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .and()
            .gte(DUE_DATE, start)
            .lt(DUE_DATE, end)
            .done();

        return this.getTasks(query);
    }

    private getTasksBefore(date: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .lt(DUE_DATE, date);

        return this.getTasks(query);
    }

    private getTasksAfter(date: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .or()
                .gte(DUE_DATE, date)
                .eq(DUE_DATE, null)
            .done();

        return this.getTasks(query);
    }

    private getTasks(query: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).get(query).then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }
}

export var service = new Service();
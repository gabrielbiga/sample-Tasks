import applicationModule = require("application");

import viewsModule = require("./utils/views");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatTime: function (date: Date) {
        var minutes = date.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = "0" + date.getMinutes();
        }

        return date.getHours() + ":" + minutes;
    },

    formatReminder: function (task: any) {
        return "10 min before";
    },

    getStatusImage: function (task: any) {
        return task.IsCompleted ? "res://ic_checkmark_checked" : "res://ic_checkmark";
    },

    getStatusFab: function (task: any) {
        return task.IsCompleted ? "res://fab_completed" : "res://fab_complete";
    }
}

applicationModule.onLaunch = function (context: any) {
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenticated) {
        applicationModule.mainModule = viewsModule.Views.main;
    }
    else {
        applicationModule.mainModule = viewsModule.Views.login;
    }
}

applicationModule.start();

import applicationModule = require("application");

import viewsModule = require("./utils/views");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatTime: function (date: Date) {
        return date.getHours() + ":" + date.getMinutes();
    }, 

    formatReminder: function (reminder: Date, dueDate: Date) {
        console.log("REMINDER: " + reminder);
        console.log("DUE DATE: " + dueDate);

        return "10 min before";
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

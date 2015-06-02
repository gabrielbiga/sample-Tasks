import applicationModule = require("application");

import viewsModule = require("./utils/views");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: formatDate,

    formatTime: formatTime,

    formatReminder: function (task: any) {
        return "10 min before";
    },

    formatDueDate: function (dueDate: Date) {
        return formatDate(dueDate) + ", " + formatTime(dueDate);
    },

    formatTasksCount: function (tasksCount: number) {
        if (tasksCount === undefined || isNaN(tasksCount)) {
            return "";
        }

        if (tasksCount === 0 || tasksCount > 1) {
            return tasksCount + " tasks";
        }

        return "1 task";
    },

    getProjectName: function (project: any) {
        return project.Name;
    },

    getStatusImage: function (task: any) {
        return task.IsCompleted ? "res://ic_checkmark_checked" : "res://ic_checkmark";
    },

    getStatusFab: function (task: any) {
        return task.IsCompleted ? "res://fab_completed" : "res://fab_complete";
    }
}

function formatDate(date: Date): string {
    return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}

function formatTime(date: Date): string {
    var minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
        minutes = "0" + date.getMinutes();
    }

    return date.getHours() + ":" + minutes;
}

applicationModule.onLaunch = function (context: any) {
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenticated) {
        applicationModule.mainModule = viewsModule.Views.projects;
    }
    else {
        applicationModule.mainModule = viewsModule.Views.login;
    }
}

applicationModule.start();

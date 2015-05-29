var applicationModule = require("application");
var viewsModule = require("./utils/views");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: formatDate,
    formatTime: formatTime,
    formatReminder: function (task) {
        return "10 min before";
    },
    formatDueDate: function (dueDate) {
        return formatDate(dueDate) + ", " + formatTime(dueDate);
    },
    getStatusImage: function (task) {
        return task.IsCompleted ? "res://ic_checkmark_checked" : "res://ic_checkmark";
    },
    getStatusFab: function (task) {
        return task.IsCompleted ? "res://fab_completed" : "res://fab_complete";
    }
};
function formatDate(date) {
    return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}
function formatTime(date) {
    var minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
        minutes = "0" + date.getMinutes();
    }
    return date.getHours() + ":" + minutes;
}
applicationModule.onLaunch = function (context) {
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenticated) {
        applicationModule.mainModule = viewsModule.Views.tasks;
    }
    else {
        applicationModule.mainModule = viewsModule.Views.login;
    }
};
applicationModule.start();
//# sourceMappingURL=app.js.map
var application = require("application");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
global.alert = dialogs.alert;
global.TELERIK_BAAS_KEY = "Rw5X5HlnO1s9E0kf";//"mT2fZel4VpIsJ7qO";
global.TOKEN_DATA_KEY = "authenticationToken";
global.PROJECT_NAME = "To-do";
global.ANDROID_OS_NAME = "Android";

application.mainModule = "app/views/login";

application.start();
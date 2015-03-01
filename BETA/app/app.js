var application = require("application");
var dialogs = require("ui/dialogs");
global.alert = dialogs.alert;
global.TELERIK_BAAS_KEY = "Rw5X5HlnO1s9E0kf";//"mT2fZel4VpIsJ7qO";
global.TOKEN_DATA_KEY = "authenticationToken";
global.TASK_ID_DATA_KEY = "taskId";
global.PROJECT_ID_DATA_KEY = "projectId";

application.mainModule = "app/views/login";

application.start();
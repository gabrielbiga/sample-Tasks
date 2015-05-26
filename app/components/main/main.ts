import observableModule = require("data/observable");

import frameModule = require("ui/frame");
import pageModule = require("ui/page");
import localSettingsModule = require("application-settings");
import platformModule = require("platform");

import mainViewModelModule = require("./main-view-model")
import serviceModule = require("../../utils/service")
import viewsModule = require("../../utils/views")

var viewModel = new mainViewModelModule.MainViewModel();
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

export function listViewItemTap(args) {
    viewModel.viewTask(args.view.bindingContext);
}

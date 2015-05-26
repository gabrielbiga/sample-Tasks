import observableModule = require("data/observable");

import frameModule = require("ui/frame");
import pageModule = require("ui/page");

import page1ViewModelModule = require("./page1-view-model");

var viewModel = new page1ViewModelModule.Page1ViewModel();
export function pageLoaded(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;

    console.log("LOADED");
}

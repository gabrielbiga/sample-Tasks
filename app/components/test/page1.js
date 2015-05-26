var page1ViewModelModule = require("./page1-view-model");
var viewModel = new page1ViewModelModule.Page1ViewModel();
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    console.log("LOADED");
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=page1.js.map
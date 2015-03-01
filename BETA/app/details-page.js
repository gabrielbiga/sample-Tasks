// Event handler for Page "navigatedTo" event attached in details-page.xml
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
exports.pageNavigatedTo = pageNavigatedTo;

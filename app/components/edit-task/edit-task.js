var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function takePictureButtonClick() {
    viewModel.takePicture();
}
exports.takePictureButtonClick = takePictureButtonClick;
//# sourceMappingURL=edit-task.js.map
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function takePictureButtonTap() {
    viewModel.takePicture();
}
exports.takePictureButtonTap = takePictureButtonTap;
function saveButtonTap() {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;
function deleteButtonTap() {
    viewModel.del();
}
exports.deleteButtonTap = deleteButtonTap;

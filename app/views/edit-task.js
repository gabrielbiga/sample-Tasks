var viewModel;

navigatedTo = function (args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel
}

exports.navigatedTo = navigatedTo;

function saveButtonClick(args) {
    viewModel.save();
}

exports.saveButtonClick = saveButtonClick;

function cancelButtonClick(args) {
    viewModel.cancel();
}

exports.cancelButtonClick = cancelButtonClick;

function takePictureButtonClick() {
    viewModel.takePicture();
}

exports.takePictureButtonClick = takePictureButtonClick;
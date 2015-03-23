var viewModel;
navigatedTo = function (args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel
}

exports.navigatedTo = navigatedTo;

function save(args) {
    viewModel.save();
}

exports.save = save;

function cancel(args) {
    viewModel.cancel();
}

exports.cancel = cancel;

function takePicture() {
    viewModel.takePicture();
}

exports.takePicture = takePicture;

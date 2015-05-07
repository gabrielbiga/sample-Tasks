var viewModel;
onNavigatedTo = function (args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel
}

exports.onNavigatedTo = onNavigatedTo;


function deleteButtonTap(args) {
    viewModel.deleteTask();
}

exports.deleteButtonTap = deleteButtonTap;

function editButtonTap(args) {
    viewModel.editTask();
}

exports.editButtonTap = editButtonTap;

function completeButtonTap(args) {
    viewModel.completeTask();
}

exports.completeButtonTap = completeButtonTap;
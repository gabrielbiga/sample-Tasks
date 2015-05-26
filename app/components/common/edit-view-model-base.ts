import platformModule = require("platform");
import enumsModule = require("ui/enums");

import viewModelBaseModule = require("./view-model-base");
import navigationModule = require("../../utils/navigation");
import notificationsModule = require("../../utils/notifications");

export class EditViewModelBase extends viewModelBaseModule.ViewModelBase {
    private _item: any;
    private _originalItem: any;
    private _isAdd: boolean;

    constructor(item?: any) {
        super();

        if (item) {
            this._isAdd = false
            this._originalItem = item;
            this.item = EditViewModelBase.clone(item);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
    }

    get item(): any {
        return this._item;
    }

    set item(value: any) {
        if (this._item !== value) {
            this._item = value;
            this.notifyPropertyChanged("item", value);
        }
    }

    get addVisibility(): string {
        if (this._isAdd) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get editVisibility(): string {
        if (this._isAdd) {
            return enumsModule.Visibility.collapsed;
        }

        return enumsModule.Visibility.visible;
    }

    createItem(): any {
        return {};
    }

    save() {
        if (this.validate()) {
            this.beginLoading();
            if (this._isAdd) {
                this.add();
            }
            else {
                this.update();
            }
        }
    }

    add() {
        this.addItem(this.item).then((data) => {
            this.item.Id = data.result.Id;
            this.onItemAdded(this.item);
            this.endLoading();
        }, error => {
                this.endLoading();
            });
    }

    update() {
        this.updateItem(this.item).then((data) => {
            EditViewModelBase.copy(this.item, this._originalItem);
            this.endLoading();
            navigationModule.goBack();
        }, error => {
                this.endLoading();
            });
    }

    del() {
        notificationsModule.confirm("Delete Item", "Do you want to delete the item?").then((value: boolean) => {
            if (value) {
                this.beginLoading();
                this.deleteItem(this.item).then((data) => {
                    this.onItemDeleted(this.item);
                    this.endLoading();
                },(error) => {
                        this.endLoading();
                    });
            }
        });
    }

    addItem(item: any): Promise<any> {
        return null;
    }

    updateItem(item: any): Promise<any> {
        return null;
    }

    deleteItem(item: any): Promise<any> {
        return null;
    }

    validate(): boolean {
        return true;
    }

    onItemAdded(item: any) {
        navigationModule.goBack();
    }

    onItemDeleted(item: any) {
        navigationModule.goBack();
    }

    private static clone(item: any): any {
        var clone = {};
        EditViewModelBase.copy(item, clone);

        return clone;
    }

    private static copy(fromItem: any, toItem: any) {
        for (var prop in fromItem) {
            if (fromItem.hasOwnProperty(prop)) {
                toItem[prop] = fromItem[prop];
            }
        }
    }
} 

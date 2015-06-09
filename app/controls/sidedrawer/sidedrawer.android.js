var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("./sideDrawer-common");
var view = require("ui/core/view");
var utils = require("utils/utils");
var bindable = require("ui/core/bindable");
var SideDrawer = (function (_super) {
    __extends(SideDrawer, _super);
    function SideDrawer() {
        _super.call(this);
    }
    SideDrawer.prototype._createUI = function () {
        this._android = new com.telerik.android.primitives.widget.sidedrawer.RadSideDrawer(this._context);
        this._android.setDrawerSize(utils.layout.getDisplayDensity() * this.drawerContentSize);
        this.android.setDrawerTransition(this.drawerTransition.getNativeContent());
        if (this.drawerLocation) {
            this.setDrawerLocation(common.SideDrawerLocation[this.drawerLocation.toString()]);
        }
    };
    Object.defineProperty(SideDrawer.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype.onLoaded = function () {
        this._addView(this.mainContent);
        this._addView(this.drawerContent);
        _super.prototype.onLoaded.call(this);
    };
    SideDrawer.prototype.onUnloaded = function () {
        this._removeView(this.mainContent);
        this._removeView(this.drawerContent);
        _super.prototype.onUnloaded.call(this);
    };
    SideDrawer.prototype._onDrawerSizeChanged = function (data) {
        if (!this.android) {
            return;
        }
        if (data.newValue) {
            this.android.setDrawerSize(java.lang.Integer.valueOf(data.newValue));
        }
    };
    SideDrawer.prototype._onDrawerContentChanged = function (data) {
        if (!this.android) {
            return;
        }
        if (data.oldValue) {
            this.android.setDrawerContent(undefined);
            if (this.isLoaded) {
                this._removeView(data.oldValue);
            }
        }
        if (data.newValue) {
            //This will automatically add the native content in the _addViewToNativeVisualTree...override
            data.newValue.bindingContext = this.bindingContext;
            this._addView(data.newValue);
        }
    };
    SideDrawer.prototype._onMainContentChanged = function (data) {
        if (!this.android) {
            return;
        }
        if (data.oldValue) {
            this.android.setMainContent(undefined);
            if (this.isLoaded) {
                this._removeView(data.oldValue);
            }
        }
        if (data.newValue) {
            //This will automatically add the native content in the _addViewToNativeVisualTree...override
            data.newValue.bindingContext = this.bindingContext;
            this._addView(data.newValue);
        }
    };
    SideDrawer.prototype._onDrawerTransitionChanged = function (data) {
        var newTransition = data.newValue;
        if (!newTransition) {
            return;
        }
        if (this.android) {
            this.android.setDrawerTransition(newTransition.getNativeContent());
        }
    };
    SideDrawer.prototype._onDrawerLocationChanged = function (data) {
        _super.prototype._onDrawerLocationChanged.call(this, data);
        if (!this.android) {
            return;
        }
        if (!data.newValue) {
            return;
        }
        var newLocation = data.newValue;
        this.setDrawerLocation(common.SideDrawerLocation[newLocation]);
    };
    SideDrawer.prototype.setDrawerLocation = function (newLocation) {
        if (newLocation === 0 /* Left */) {
            this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.LEFT);
        }
        else if (newLocation === 2 /* Top */) {
            this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.TOP);
        }
        else if (newLocation === 1 /* Right */) {
            this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.RIGHT);
        }
        else if (newLocation === 3 /* Bottom */) {
            this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.BOTTOM);
        }
    };
    SideDrawer.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.mainContent instanceof view.View) {
            this.mainContent.bindingContext = newValue;
        }
        if (this.drawerContent instanceof view.View) {
            this.drawerContent.bindingContext = newValue;
        }
    };
    SideDrawer.prototype._addViewToNativeVisualTree = function (child) {
        if (this._android && child.android) {
            if (this.mainContent === child) {
                this._android.setMainContent(child.android);
                return true;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(child.android);
                return true;
            }
        }
        return false;
    };
    SideDrawer.prototype._removeViewFromNativeVisualTree = function (child) {
        if (this._android && child.android) {
            if (this.mainContent === child) {
                this._android.setMainContent(null);
                child._isAddedToNativeVisualTree = false;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(null);
                child._isAddedToNativeVisualTree = false;
            }
        }
    };
    SideDrawer.prototype.closeDrawer = function () {
        if (this.android) {
            this.android.setIsOpen(false);
        }
    };
    SideDrawer.prototype.showDrawer = function () {
        if (this.android) {
            this.android.setIsOpen(true);
        }
    };
    SideDrawer.prototype.showDrawerWithTransition = function (transition) {
        if (this.android) {
            this.android.setDrawerTransition(transition.getNativeContent());
            this.showDrawer();
        }
    };
    return SideDrawer;
})(common.SideDrawer);
exports.SideDrawer = SideDrawer;
var DrawerTransitionBase = (function (_super) {
    __extends(DrawerTransitionBase, _super);
    function DrawerTransitionBase() {
        _super.apply(this, arguments);
    }
    DrawerTransitionBase.prototype.getNativeContent = function () {
        return undefined;
    };
    return DrawerTransitionBase;
})(bindable.Bindable);
exports.DrawerTransitionBase = DrawerTransitionBase;
var FadeTransition = (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        _super.apply(this, arguments);
    }
    FadeTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.FadeTransition();
    };
    return FadeTransition;
})(DrawerTransitionBase);
exports.FadeTransition = FadeTransition;
var PushTransition = (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        _super.apply(this, arguments);
    }
    PushTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.PushTransition();
    };
    return PushTransition;
})(DrawerTransitionBase);
exports.PushTransition = PushTransition;
var RevealTransition = (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        _super.apply(this, arguments);
    }
    RevealTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.RevealTransition();
    };
    return RevealTransition;
})(DrawerTransitionBase);
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        _super.apply(this, arguments);
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ReverseSlideOutTransition();
    };
    return ReverseSlideOutTransition;
})(DrawerTransitionBase);
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        _super.apply(this, arguments);
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleDownPusherTransition();
    };
    return ScaleDownPusherTransition;
})(DrawerTransitionBase);
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        _super.apply(this, arguments);
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleUpTransition();
    };
    return ScaleUpTransition;
})(DrawerTransitionBase);
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        _super.apply(this, arguments);
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideAlongTransition();
    };
    return SlideAlongTransition;
})(DrawerTransitionBase);
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        _super.apply(this, arguments);
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideInOnTopTransition();
    };
    return SlideInOnTopTransition;
})(DrawerTransitionBase);
exports.SlideInOnTopTransition = SlideInOnTopTransition;
//# sourceMappingURL=sidedrawer.android.js.map
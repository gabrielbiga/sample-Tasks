var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var commonModule = require("./sidedrawer-common");
var viewModule = require("ui/core/view");
var contentView = require("ui/content-view");
var utils = require("utils/utils");
;
////////////////////////////////////////////////
var SideDrawer = (function (_super) {
    __extends(SideDrawer, _super);
    function SideDrawer() {
        _super.call(this);
        this._mainContentHost = new contentView.ContentView();
        this._drawerContentHost = new contentView.ContentView();
        this._ios = TKSideDrawerView.alloc().initWithFrameMainView(UIScreen.mainScreen().bounds, this._mainContentHost.ios);
        this._ios.sideDrawerContentView = this._drawerContentHost.ios;
        this._delegate = TKSideDrawerDelegateImpl.new().initWithOwner(this);
        this._ios.sideDrawer.width = this.drawerContentSize;
        this._ios.sideDrawer.style.blurType = 0;
        this._ios.sideDrawer.headerView = null;
        this._ios.sideDrawer.footerView = null;
    }
    Object.defineProperty(SideDrawer.prototype, "delegate", {
        get: function () {
            return this._delegateHandler;
        },
        set: function (newDelegate) {
            this._delegateHandler = newDelegate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    //data changed event handlers
    SideDrawer.prototype._onDrawerLocationChanged = function (eventData) {
        var valueString = eventData.newValue.toString();
        var newLocation = commonModule.SideDrawerLocation[valueString];
        switch (newLocation) {
            case 0 /* Left */:
                this._ios.sideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionLeft;
                break;
            case 1 /* Right */:
                this._ios.sideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionRight;
                break;
            case 2 /* Top */:
                this._ios.sideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionTop;
                break;
            case 3 /* Bottom */:
                this._ios.sideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionBottom;
                break;
        }
    };
    SideDrawer.prototype._onDrawerContentSizeChanged = function (eventData) {
        var value = eventData.newValue;
        this._ios.sideDrawer.width = value;
    };
    SideDrawer.prototype._onDrawerTransitionChanged = function (eventData) {
        var value = eventData.newValue;
        this._ios.sideDrawer.transition = value.getNativeContent();
    };
    SideDrawer.prototype._onMainContentChanged = function (eventData) {
        var drawer = eventData.object;
        var newContent = eventData.newValue;
        if (newContent instanceof viewModule.View) {
            drawer._mainContentHost.content = newContent;
        }
    };
    SideDrawer.prototype._onDrawerContentChanged = function (eventData) {
        var drawer = eventData.object;
        var newContent = eventData.newValue;
        if (newContent instanceof viewModule.View) {
            drawer._drawerContentHost.content = newContent;
        }
    };
    Object.defineProperty(SideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype.closeDrawer = function () {
        this._ios.sideDrawer.dismiss();
    };
    SideDrawer.prototype.showDrawer = function () {
        this._ios.sideDrawer.show();
    };
    SideDrawer.prototype.showDrawerWithTransition = function (transition) {
        this._ios.sideDrawer.showWithTransition(transition.getNativeContent());
    };
    SideDrawer.prototype.dismiss = function () {
        this._ios.sideDrawer.dismiss();
    };
    SideDrawer.prototype.onLoaded = function () {
        this._addView(this._mainContentHost);
        this._addView(this._drawerContentHost);
        this._ios.sideDrawer.delegate = this._delegate;
        _super.prototype.onLoaded.call(this);
    };
    SideDrawer.prototype.onUnloaded = function () {
        this._removeView(this._mainContentHost);
        this._removeView(this._drawerContentHost);
        _super.prototype.onUnloaded.call(this);
    };
    SideDrawer.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this._mainContentHost instanceof viewModule.View) {
            this._mainContentHost.bindingContext = this.bindingContext;
        }
        if (this._drawerContentHost instanceof viewModule.View) {
            this._drawerContentHost.bindingContext = this.bindingContext;
        }
    };
    SideDrawer.prototype.onLayout = function (left, top, right, bottom) {
        var width = right - left;
        var height = bottom - top;
        this._drawerContentHost.layout(0, 0, width, this.drawerContentSize);
        this._mainContentHost.layout(0, 0, width, height);
    };
    SideDrawer.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var pos = this._ios.sideDrawer.position;
        if (pos == TKSideDrawerPosition.TKSideDrawerPositionTop || pos == TKSideDrawerPosition.TKSideDrawerPositionBottom) {
            viewModule.View.measureChild(this, this._drawerContentHost, widthMeasureSpec, utils.layout.makeMeasureSpec(this.drawerContentSize, utils.layout.EXACTLY));
        }
        else {
            viewModule.View.measureChild(this, this._drawerContentHost, utils.layout.makeMeasureSpec(this.drawerContentSize, utils.layout.EXACTLY), heightMeasureSpec);
        }
        var result = viewModule.View.measureChild(this, this._mainContentHost, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var widthAndState = viewModule.View.resolveSizeAndState(result.measuredWidth, width, widthMode, 0);
        var heightAndState = viewModule.View.resolveSizeAndState(result.measuredHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    return SideDrawer;
})(commonModule.SideDrawer);
exports.SideDrawer = SideDrawer;
////////////////////////////////////////////////
//              TRANSITIONS
////////////////////////////////////////////////
var FadeTransition = (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        _super.apply(this, arguments);
    }
    FadeTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeFadeIn;
    };
    return FadeTransition;
})(commonModule.DrawerTransitionBase);
exports.FadeTransition = FadeTransition;
var PushTransition = (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        _super.apply(this, arguments);
    }
    PushTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypePush;
    };
    return PushTransition;
})(commonModule.DrawerTransitionBase);
exports.PushTransition = PushTransition;
var RevealTransition = (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        _super.apply(this, arguments);
    }
    RevealTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeReveal;
    };
    return RevealTransition;
})(commonModule.DrawerTransitionBase);
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        _super.apply(this, arguments);
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeReverseSlideOut;
    };
    return ReverseSlideOutTransition;
})(commonModule.DrawerTransitionBase);
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        _super.apply(this, arguments);
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeScaleDownPusher;
    };
    return ScaleDownPusherTransition;
})(commonModule.DrawerTransitionBase);
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        _super.apply(this, arguments);
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeScaleUp;
    };
    return ScaleUpTransition;
})(commonModule.DrawerTransitionBase);
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        _super.apply(this, arguments);
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeSlideAlong;
    };
    return SlideAlongTransition;
})(commonModule.DrawerTransitionBase);
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        _super.apply(this, arguments);
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeSlideInOnTop;
    };
    return SlideInOnTopTransition;
})(commonModule.DrawerTransitionBase);
exports.SlideInOnTopTransition = SlideInOnTopTransition;
////////////////////////////////////////////////
//      Delegate implementation
////////////////////////////////////////////////
var TKSideDrawerDelegateImpl = (function (_super) {
    __extends(TKSideDrawerDelegateImpl, _super);
    function TKSideDrawerDelegateImpl() {
        _super.apply(this, arguments);
    }
    TKSideDrawerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    TKSideDrawerDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKSideDrawerDelegateImpl.prototype.willShowSideDrawer = function (sideDrawer) {
        if (this._owner.delegate && (typeof this._owner.delegate.willShowSideDrawer === 'function')) {
            this._owner.delegate.willShowSideDrawer();
        }
    };
    TKSideDrawerDelegateImpl.prototype.didShowSideDrawer = function (sideDrawer) {
        if (this._owner.delegate && (typeof this._owner.delegate.didShowSideDrawer === 'function')) {
            this._owner.delegate.didShowSideDrawer(sideDrawer);
        }
    };
    TKSideDrawerDelegateImpl.prototype.willDismissSideDrawer = function (sideDrawer) {
        if (this._owner.delegate && (typeof this._owner.delegate.willDismissSideDrawer === 'function')) {
            this._owner.delegate.willDismissSideDrawer(sideDrawer);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didDismissSideDrawer = function (sideDrawer) {
        if (this._owner.delegate && (typeof this._owner.delegate.didDismissSideDrawer === 'function')) {
            this._owner.delegate.didDismissSideDrawer(sideDrawer);
        }
    };
    TKSideDrawerDelegateImpl.ObjCProtocols = [TKSideDrawerDelegate];
    return TKSideDrawerDelegateImpl;
})(NSObject);
//# sourceMappingURL=sideDrawer.ios.js.map
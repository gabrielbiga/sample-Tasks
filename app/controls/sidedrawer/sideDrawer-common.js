var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var view = require("ui/core/view");
(function (SideDrawerLocation) {
    SideDrawerLocation[SideDrawerLocation["Left"] = 0] = "Left";
    SideDrawerLocation[SideDrawerLocation["Right"] = 1] = "Right";
    SideDrawerLocation[SideDrawerLocation["Top"] = 2] = "Top";
    SideDrawerLocation[SideDrawerLocation["Bottom"] = 3] = "Bottom";
})(exports.SideDrawerLocation || (exports.SideDrawerLocation = {}));
var SideDrawerLocation = exports.SideDrawerLocation;
var DrawerTransitionBase = (function () {
    function DrawerTransitionBase() {
    }
    DrawerTransitionBase.prototype.getNativeContent = function () {
        return undefined;
    };
    return DrawerTransitionBase;
})();
exports.DrawerTransitionBase = DrawerTransitionBase;
var SideDrawer = (function (_super) {
    __extends(SideDrawer, _super);
    function SideDrawer() {
        _super.apply(this, arguments);
    }
    SideDrawer.onDrawerTransitionChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onDrawerTransitionChanged(eventData);
    };
    SideDrawer.onDrawerContentSizeChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onDrawerContentSizeChanged(eventData);
    };
    SideDrawer.onDrawerLocationPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onDrawerLocationChanged(eventData);
    };
    SideDrawer._onMainContentPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMainContentChanged(eventData);
    };
    SideDrawer._onDrawerContentPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onDrawerContentChanged(eventData);
    };
    SideDrawer.prototype._onMainContentChanged = function (eventData) {
    };
    SideDrawer.prototype._onDrawerContentChanged = function (eventData) {
    };
    SideDrawer.prototype._onDrawerLocationChanged = function (eventData) {
    };
    SideDrawer.prototype._onDrawerTransitionChanged = function (eventData) {
    };
    SideDrawer.prototype._onDrawerContentSizeChanged = function (eventData) {
    };
    Object.defineProperty(SideDrawer.prototype, "drawerTransition", {
        get: function () {
            return this._getValue(SideDrawer.drawerTransitionProperty);
        },
        set: function (value) {
            this._setValue(SideDrawer.drawerTransitionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "drawerContentSize", {
        get: function () {
            return this._getValue(SideDrawer.drawerContentSizeProperty);
        },
        set: function (value) {
            this._setValue(SideDrawer.drawerContentSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "drawerLocation", {
        get: function () {
            return this._getValue(SideDrawer.drawerLocationProperty);
        },
        set: function (value) {
            this._setValue(SideDrawer.drawerLocationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "drawerContent", {
        get: function () {
            return this._getValue(SideDrawer.drawerContentProperty);
        },
        set: function (value) {
            this._setValue(SideDrawer.drawerContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "mainContent", {
        get: function () {
            return this._getValue(SideDrawer.mainContentProperty);
        },
        set: function (value) {
            this._setValue(SideDrawer.mainContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "delegate", {
        get: function () {
            return undefined;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype.showDrawer = function () {
    };
    SideDrawer.prototype.closeDrawer = function () {
    };
    SideDrawer.prototype.showDrawerWithTransition = function (transition) {
    };
    Object.defineProperty(SideDrawer.prototype, "_childrenCount", {
        get: function () {
            var count = 0;
            if (this.drawerContent) {
                count++;
            }
            if (this.mainContent) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype._eachChildView = function (callback) {
        if (this.mainContent) {
            callback(this.mainContent);
        }
        if (this.drawerContent) {
            callback(this.drawerContent);
        }
    };
    Object.defineProperty(SideDrawer.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideDrawer.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.drawerTransitionProperty = new dependencyObservable.Property("drawerTransition", "SideDrawer", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, SideDrawer.onDrawerTransitionChanged));
    SideDrawer.drawerContentSizeProperty = new dependencyObservable.Property("drawerContentSize", "SideDrawer", new proxy.PropertyMetadata(280, dependencyObservable.PropertyMetadataSettings.AffectsLayout, SideDrawer.onDrawerContentSizeChanged));
    SideDrawer.drawerLocationProperty = new dependencyObservable.Property("drawerLocation", "SideDrawer", new proxy.PropertyMetadata(0 /* Left */, dependencyObservable.PropertyMetadataSettings.AffectsLayout, SideDrawer.onDrawerLocationPropertyChanged));
    SideDrawer.mainContentProperty = new dependencyObservable.Property("mainContent", "SideDrawer", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, SideDrawer._onMainContentPropertyChanged));
    SideDrawer.drawerContentProperty = new dependencyObservable.Property("drawerContent", "SideDrawer", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, SideDrawer._onDrawerContentPropertyChanged));
    return SideDrawer;
})(view.View);
exports.SideDrawer = SideDrawer;
//# sourceMappingURL=sideDrawer-common.js.map
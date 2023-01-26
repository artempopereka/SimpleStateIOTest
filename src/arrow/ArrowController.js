"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowController = void 0;
var GameEvents_1 = require("../GameEvents");
var ComponentController_1 = require("../common/ComponentController");
var ArrowController = /** @class */ (function (_super) {
    __extends(ArrowController, _super);
    function ArrowController(view) {
        var _this = _super.call(this) || this;
        _this.view = view;
        _this.addListeners();
        return _this;
    }
    ArrowController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.UPDATE_ARROW_POSITION, this.onUpdateArrowPosition, this);
    };
    ArrowController.prototype.onUpdateArrowPosition = function (point) {
        this.view.onUpdateViewPosition(point);
    };
    return ArrowController;
}(ComponentController_1.ComponentController));
exports.ArrowController = ArrowController;
//# sourceMappingURL=ArrowController.js.map
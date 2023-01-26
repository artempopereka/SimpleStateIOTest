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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointView = void 0;
var PIXI = __importStar(require("pixi.js"));
var Settings_1 = require("../Settings");
var PointView = /** @class */ (function (_super) {
    __extends(PointView, _super);
    function PointView(sprite, pointId) {
        var _this = _super.call(this) || this;
        _this.pointSprite = sprite;
        _this.pointId = pointId;
        _this.soldiersAmountText = new PIXI.Text(Settings_1.Settings.labelsStyle.emptyText, Settings_1.Settings.labelsStyle.style);
        _this.init();
        return _this;
    }
    PointView.prototype.init = function () {
        this.addChild(this.pointSprite);
        this.position.x = Settings_1.Settings.areas[this.pointId].point.position.x;
        this.position.y = Settings_1.Settings.areas[this.pointId].point.position.y;
        this.soldiersAmountText.x = Settings_1.Settings.labelsStyle.position.x;
        this.soldiersAmountText.y = Settings_1.Settings.labelsStyle.position.y;
        this.pointSprite.addChild(this.soldiersAmountText);
    };
    PointView.prototype.setSoldierAmount = function (amount) {
        this.soldiersAmountText.text = amount.toString();
    };
    return PointView;
}(PIXI.Container));
exports.PointView = PointView;
//# sourceMappingURL=PointView.js.map
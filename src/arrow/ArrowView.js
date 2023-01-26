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
exports.ArrowView = void 0;
var PIXI = __importStar(require("pixi.js"));
var Settings_1 = require("../Settings");
var resources_1 = require("../resources");
var ArrowBodyView_1 = require("./ArrowBodyView");
var ArrowView = /** @class */ (function (_super) {
    __extends(ArrowView, _super);
    function ArrowView(sprite, point, centerPoint, index) {
        var _this = _super.call(this) || this;
        _this.arrowSprite = sprite;
        _this.centerPoint = centerPoint;
        _this.index = index;
        _this.init(point);
        return _this;
    }
    ArrowView.prototype.init = function (point) {
        var arrowBodySprite = new PIXI.Sprite(PIXI.Texture.from(resources_1.ImageAssets.arrow_body));
        this.arrowBodySprite = new ArrowBodyView_1.ArrowBodyView(arrowBodySprite, this.centerPoint);
        this.arrowSprite.anchor.set(0.5);
        this.arrowSprite.alpha = 0.5;
        this.arrowSprite.tint = 0xcc00FF;
        this.onUpdateViewPosition(point);
        this.addChild(this.arrowSprite);
        this.arrowSprite.addChild(this.arrowBodySprite);
    };
    ArrowView.prototype.onUpdateViewPosition = function (point) {
        this.arrowSprite.x = point.x;
        this.arrowSprite.y = point.y;
        var angle = Math.atan2(point.y - this.centerPoint.y, point.x - this.centerPoint.x) + Settings_1.Settings.angelArrowUp;
        this.arrowSprite.rotation = angle;
        if (this.arrowBodySprite) {
            var bodyLength = Math.sqrt(Math.pow(Math.abs(point.y - this.centerPoint.y), 2) + Math.pow(Math.abs(point.x - this.centerPoint.x), 2));
            this.arrowBodySprite.updateBodyLength(bodyLength);
        }
    };
    return ArrowView;
}(PIXI.Container));
exports.ArrowView = ArrowView;
//# sourceMappingURL=ArrowView.js.map
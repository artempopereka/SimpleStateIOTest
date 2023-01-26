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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldiersView = void 0;
var PIXI = __importStar(require("pixi.js"));
var SoldierView_1 = require("./SoldierView");
var GameEvents_1 = require("../GameEvents");
var gsap_1 = __importDefault(require("gsap"));
var SoldiersView = /** @class */ (function (_super) {
    __extends(SoldiersView, _super);
    function SoldiersView() {
        return _super.call(this) || this;
    }
    SoldiersView.prototype.init = function (pointAttack, pointAttacked, duration) {
        this.pointAttack = pointAttack;
        this.pointAttacked = pointAttacked;
        this.durationAttacked = duration;
    };
    SoldiersView.prototype.addSoldiers = function (lastSoldier) {
        var _this = this;
        if (this.pointAttack && this.pointAttacked) {
            var soldier_1 = new SoldierView_1.SoldierView();
            soldier_1.x = this.pointAttack.x;
            soldier_1.y = this.pointAttack.y;
            this.addChild(soldier_1);
            gsap_1.default.fromTo(soldier_1.position, { x: this.pointAttack.x, y: this.pointAttack.y }, { x: this.pointAttacked.x, y: this.pointAttacked.y, duration: this.durationAttacked, ease: "linear" }).then(function () {
                _this.emit(GameEvents_1.GameEvents.SOLDIER_FIGHT_ENEMY);
                _this.removeChild(soldier_1);
                if (lastSoldier) {
                    _this.emit(GameEvents_1.GameEvents.SOLDIERS_ENDED);
                }
            });
        }
    };
    return SoldiersView;
}(PIXI.Container));
exports.SoldiersView = SoldiersView;
//# sourceMappingURL=SoldiersView.js.map
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
exports.PointController = void 0;
var GameEvents_1 = require("../GameEvents");
var ComponentController_1 = require("../common/ComponentController");
var Settings_1 = require("../Settings");
var PointController = /** @class */ (function (_super) {
    __extends(PointController, _super);
    function PointController(view) {
        var _this = _super.call(this) || this;
        _this.pointBusy = 0; // 0 - base, 1 - player, 2 - ai
        _this.soldiersAmount = Settings_1.Settings.startSoldierAmount;
        _this.view = view;
        _this.addListeners();
        _this.init();
        return _this;
    }
    PointController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.EMIT_SOLDIERS, this.onEmitSoldiers, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.DECREASE_SOLDIER_AT_HOME, this.onDecreaseSoldierAtHome, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.SOLDIER_FIGHT_ENEMY, this.onSoldierFightEnemy, this);
    };
    PointController.prototype.init = function () {
        this.view.init();
        this.view.setSoldierAmount(this.soldiersAmount);
    };
    PointController.prototype.onEmitSoldiers = function () {
        if (this.soldiersAmount < Settings_1.Settings.startSoldierAmount && this.pointBusy === 0) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
        }
        else if (this.pointBusy > 0 && this.soldiersAmount < Settings_1.Settings.maxSoldierAmount) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
            this.dispatcher.emit(GameEvents_1.GameEvents.BIRTH_SOLDIER_ON_FIGHT_POINT, this.view.pointId);
        }
    };
    PointController.prototype.onDecreaseSoldierAtHome = function (attackArea) {
        if (this.view.pointId === attackArea) {
            this.soldiersAmount--;
            this.view.setSoldierAmount(this.soldiersAmount);
        }
    };
    PointController.prototype.onSoldierFightEnemy = function (soldierFightData) {
        var whichSoldiers = soldierFightData.isAI ? 2 : 1;
        if (this.view.pointId === soldierFightData.targetPlayerAttack && this.pointBusy != whichSoldiers) {
            this.soldiersAmount--;
            if (this.soldiersAmount < 0) {
                this.pointBusy = whichSoldiers;
                this.soldiersAmount = Math.abs(this.soldiersAmount);
                var gotEvent = soldierFightData.isAI ? GameEvents_1.GameEvents.AI_GOT_AREA : GameEvents_1.GameEvents.PLAYER_GOT_AREA;
                this.dispatcher.emit(gotEvent, soldierFightData.targetPlayerAttack);
            }
            this.view.setSoldierAmount(this.soldiersAmount);
        }
        else if (this.view.pointId === soldierFightData.targetPlayerAttack && this.pointBusy === whichSoldiers) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
        }
    };
    return PointController;
}(ComponentController_1.ComponentController));
exports.PointController = PointController;
//# sourceMappingURL=PointController.js.map
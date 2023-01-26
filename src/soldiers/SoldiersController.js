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
exports.SoldiersController = void 0;
var GameEvents_1 = require("../GameEvents");
var ComponentController_1 = require("../common/ComponentController");
var Settings_1 = require("../Settings");
var SoldiersController = /** @class */ (function (_super) {
    __extends(SoldiersController, _super);
    function SoldiersController(view, soldierAttackData, soldierViewIndex, isAI) {
        var _this = _super.call(this) || this;
        _this.soldiersAdded = 0;
        _this.view = view;
        _this.soldierAttackData = soldierAttackData;
        _this.soldierViewIndex = soldierViewIndex;
        _this.isAI = isAI;
        _this.addListeners();
        _this.init();
        return _this;
    }
    SoldiersController.prototype.addListeners = function () {
        this.view.on(GameEvents_1.GameEvents.SOLDIER_FIGHT_ENEMY, this.onSoldierFightEnemy, this);
        this.view.on(GameEvents_1.GameEvents.SOLDIERS_ENDED, this.onSoldierEnded, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.BIRTH_SOLDIER_ON_FIGHT_POINT, this.onBirthSoldierOnFightPoint, this);
    };
    SoldiersController.prototype.init = function () {
        var wayLength = Math.sqrt(Math.pow(Math.abs(this.soldierAttackData.pointAttack.y - this.soldierAttackData.pointAttacked.y), 2) +
            Math.pow(Math.abs(this.soldierAttackData.pointAttack.x - this.soldierAttackData.pointAttacked.x), 2));
        var duration = (wayLength / Settings_1.Settings.durationWaySection) * Settings_1.Settings.durationWaySectionTime;
        this.view.init(this.soldierAttackData.pointAttack, this.soldierAttackData.pointAttacked, duration);
        this.addSolders();
    };
    SoldiersController.prototype.addSolders = function () {
        var _this = this;
        if (this.soldiersAdded < this.soldierAttackData.soldiersAmount) {
            this.soldiersAdded++;
            this.dispatcher.emit(GameEvents_1.GameEvents.DECREASE_SOLDIER_AT_HOME, this.soldierAttackData.attackAreas);
            this.view.addSoldiers(this.soldiersAdded === this.soldierAttackData.soldiersAmount);
            setTimeout(function () {
                _this.addSolders();
            }, Settings_1.Settings.delay.soldierAdd);
        }
    };
    SoldiersController.prototype.onSoldierFightEnemy = function () {
        var soldierFightData = {
            targetPlayerAttack: this.soldierAttackData.targetPlayerAttack,
            isAI: this.isAI
        };
        this.dispatcher.emit(GameEvents_1.GameEvents.SOLDIER_FIGHT_ENEMY, soldierFightData);
    };
    SoldiersController.prototype.onSoldierEnded = function () {
        this.dispatcher.emit(GameEvents_1.GameEvents.SOLDIERS_ENDED, this.soldierViewIndex);
    };
    SoldiersController.prototype.onBirthSoldierOnFightPoint = function (pointId) {
        if (pointId === this.soldierAttackData.attackAreas) {
            this.soldierAttackData.soldiersAmount++;
        }
    };
    return SoldiersController;
}(ComponentController_1.ComponentController));
exports.SoldiersController = SoldiersController;
//# sourceMappingURL=SoldiersController.js.map
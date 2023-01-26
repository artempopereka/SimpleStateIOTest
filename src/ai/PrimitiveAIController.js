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
exports.PrimitiveAIController = void 0;
var GameEvents_1 = require("../GameEvents");
var ComponentController_1 = require("../common/ComponentController");
var Settings_1 = require("../Settings");
var GameStateModel_1 = require("../GameStateModel");
var PrimitiveAIController = /** @class */ (function (_super) {
    __extends(PrimitiveAIController, _super);
    function PrimitiveAIController() {
        var _this = _super.call(this) || this;
        _this.enemySoldiers = [];
        _this.aiSoldiers = [];
        _this.gameModel = GameStateModel_1.gameSateModel;
        _this.init();
        _this.addListeners();
        return _this;
    }
    PrimitiveAIController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.CHECK_AI_CAN_ATTACK, this.onCheckAICanAttack, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CHECK_AREA_SOLDIERS, this.onCheckAreaSoldiers, this);
    };
    PrimitiveAIController.prototype.init = function () {
        this.chooseAIArea();
    };
    PrimitiveAIController.prototype.chooseAIArea = function () {
        var aiAreaIndex = this.randomAIArea();
        if (this.gameModel.playerAreas[0] === aiAreaIndex) {
            this.chooseAIArea();
        }
        else {
            var aiAreas = this.gameModel.aiAreas;
            aiAreas.push(aiAreaIndex);
            this.gameModel.aiAreas.push(aiAreaIndex);
            this.dispatcher.emit(GameEvents_1.GameEvents.AI_GOT_AREA, aiAreaIndex);
        }
    };
    PrimitiveAIController.prototype.randomAIArea = function () {
        return Math.floor(Math.random() * Settings_1.Settings.areas.length);
    };
    PrimitiveAIController.prototype.onCheckAICanAttack = function () {
        var _this = this;
        this.enemySoldiers = [];
        this.aiSoldiers = [];
        if (Math.floor(Math.random() * Settings_1.Settings.phaseAIWantAttack) > 0) {
            setTimeout(function () {
                _this.checkAreasCanCapture();
            }, Settings_1.Settings.delay.soldierAdd);
        }
    };
    PrimitiveAIController.prototype.onCheckAreaSoldiers = function (soldiersData) {
        if (soldiersData.isEnemy) {
            this.enemySoldiers.push(soldiersData);
        }
        else {
            this.aiSoldiers.push(soldiersData);
        }
    };
    PrimitiveAIController.prototype.checkAreasCanCapture = function () {
        this.aiSoldiers = this.shuffle(this.aiSoldiers);
        this.enemySoldiers = this.shuffle(this.enemySoldiers);
        label: for (var indexAISoldiers = 0; indexAISoldiers < this.aiSoldiers.length; indexAISoldiers++) {
            for (var indexEnemySoldiers = 0; indexEnemySoldiers < this.enemySoldiers.length; indexEnemySoldiers++) {
                if (this.aiSoldiers[indexAISoldiers].soldierAmount > this.enemySoldiers[indexEnemySoldiers].soldierAmount) {
                    var attackData = {
                        attackArea: this.aiSoldiers[indexAISoldiers].index,
                        targetAttack: this.enemySoldiers[indexEnemySoldiers].index
                    };
                    this.dispatcher.emit(GameEvents_1.GameEvents.AI_STAR_CAMPAIGN, attackData);
                    break label;
                }
            }
        }
    };
    PrimitiveAIController.prototype.shuffle = function (soldiersData) {
        var counter = soldiersData.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            var index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            var temp = soldiersData[counter];
            soldiersData[counter] = soldiersData[index];
            soldiersData[index] = temp;
        }
        return soldiersData;
    };
    return PrimitiveAIController;
}(ComponentController_1.ComponentController));
exports.PrimitiveAIController = PrimitiveAIController;
//# sourceMappingURL=PrimitiveAIController.js.map
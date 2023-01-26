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
exports.SceneController = void 0;
var PIXI = __importStar(require("pixi.js"));
var ComponentController_1 = require("../common/ComponentController");
var AreaView_1 = require("../area/AreaView");
var GameEvents_1 = require("../GameEvents");
var Settings_1 = require("../Settings");
var resources_1 = require("../resources");
var AreaController_1 = require("../area/AreaController");
var GameStateModel_1 = require("../GameStateModel");
var SceneController = /** @class */ (function (_super) {
    __extends(SceneController, _super);
    function SceneController(areaContainer) {
        var _this = _super.call(this) || this;
        _this.areas = [];
        _this.areaControllers = [];
        _this.areaContainer = areaContainer;
        _this.init();
        _this.addListeners();
        return _this;
    }
    SceneController.prototype.init = function () {
        this.clearAreas();
        this.generateLevel();
    };
    SceneController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.STAR_CAMPAIGN, this.onStartCampaign, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.AI_STAR_CAMPAIGN, this.onAIStartCampaign, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.MOVE_SOLDIERS, this.onMoveSoldiers, this);
    };
    SceneController.prototype.clearAreas = function () {
        this.areas = [];
        this.areaContainer.removeChildren();
    };
    SceneController.prototype.generateLevel = function () {
        for (var indexArea = 0; indexArea < Settings_1.Settings.areas.length; indexArea++) {
            var areaSprite = new PIXI.Sprite(PIXI.Texture.from(resources_1.imageAssetsAreaList[indexArea]));
            var currentArea = new AreaView_1.AreaView(areaSprite, indexArea);
            var currentAreaController = new AreaController_1.AreaController(currentArea);
            this.areas.push(currentArea);
            this.areaControllers.push(currentAreaController);
            this.areaContainer.addChild(currentArea);
        }
    };
    SceneController.prototype.onAIStartCampaign = function (attackData) {
        var soldierAmount = this.areaControllers[attackData.attackArea].pointController.soldiersAmount;
        var pointAttack = new PIXI.Point(this.areaControllers[attackData.attackArea].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[attackData.attackArea].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
        var pointAttacked = new PIXI.Point(this.areaControllers[attackData.targetAttack].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[attackData.targetAttack].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
        var soldierAttackData = {
            soldiersAmount: soldierAmount,
            pointAttack: pointAttack,
            pointAttacked: pointAttacked,
            attackAreas: attackData.attackArea,
            targetPlayerAttack: attackData.targetAttack
        };
        this.dispatcher.emit(GameEvents_1.GameEvents.ADD_AI_ATTACK, soldierAttackData);
    };
    SceneController.prototype.onStartCampaign = function () {
        var _this = this;
        for (var indexAreaAttack = 0; indexAreaAttack < GameStateModel_1.gameSateModel.attackAreas.length; indexAreaAttack++) {
            var soldierAmount = this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].pointController.soldiersAmount;
            var pointAttack = new PIXI.Point(this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var pointAttacked = new PIXI.Point(this.areaControllers[GameStateModel_1.gameSateModel.targetPlayerAttack].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[GameStateModel_1.gameSateModel.targetPlayerAttack].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var soldierAttackData = {
                soldiersAmount: soldierAmount,
                pointAttack: pointAttack,
                pointAttacked: pointAttacked,
                attackAreas: GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack],
                targetPlayerAttack: GameStateModel_1.gameSateModel.targetPlayerAttack
            };
            this.dispatcher.emit(GameEvents_1.GameEvents.ADD_SOLDIER_ATTACK, soldierAttackData);
        }
        setTimeout(function () {
            _this.dispatcher.emit(GameEvents_1.GameEvents.CAMPAIGN_STARTED);
        }, Settings_1.Settings.delay.pointerUpOutSide);
    };
    SceneController.prototype.onMoveSoldiers = function () {
        var _this = this;
        for (var indexAreaAttack = 0; indexAreaAttack < GameStateModel_1.gameSateModel.attackAreas.length; indexAreaAttack++) {
            var soldierAmount = this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].pointController.soldiersAmount;
            var pointAttack = new PIXI.Point(this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var pointAttacked = new PIXI.Point(this.areaControllers[GameStateModel_1.gameSateModel.targetPlayerMove].view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.areaControllers[GameStateModel_1.gameSateModel.targetPlayerMove].view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var soldierAttackData = {
                soldiersAmount: soldierAmount,
                pointAttack: pointAttack,
                pointAttacked: pointAttacked,
                attackAreas: GameStateModel_1.gameSateModel.attackAreas[indexAreaAttack],
                targetPlayerAttack: GameStateModel_1.gameSateModel.targetPlayerMove
            };
            this.dispatcher.emit(GameEvents_1.GameEvents.ADD_SOLDIER_MOVE, soldierAttackData);
        }
        setTimeout(function () {
            _this.dispatcher.emit(GameEvents_1.GameEvents.MOVE_SOLDIERS_STARTED);
        }, Settings_1.Settings.delay.pointerUpOutSide);
    };
    return SceneController;
}(ComponentController_1.ComponentController));
exports.SceneController = SceneController;
//# sourceMappingURL=SceneController.js.map
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
exports.AreaController = void 0;
var GameEvents_1 = require("../GameEvents");
var PIXI = __importStar(require("pixi.js"));
var ComponentController_1 = require("../common/ComponentController");
var PointController_1 = require("../point/PointController");
var GameStateModel_1 = require("../GameStateModel");
var Polygons_1 = require("../Polygons");
var Settings_1 = require("../Settings");
var AreaController = /** @class */ (function (_super) {
    __extends(AreaController, _super);
    function AreaController(view) {
        var _this = _super.call(this) || this;
        _this.areaBusy = 0; // 0 - base; 1 - player; 2 - ai;
        _this.isAttack = false;
        _this.view = view;
        _this.pointController = new PointController_1.PointController(_this.view.pointView);
        _this.init();
        _this.addListeners();
        return _this;
    }
    AreaController.prototype.init = function () {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.hitArea = new PIXI.Polygon(Polygons_1.Polygons.areas[this.view.areaId]);
        this.view.cursor = "default";
        this.view.pointView.interactive = true;
        this.view.init();
    };
    AreaController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.PLAYER_GOT_AREA, this.onPlayerGotArea, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.AI_GOT_AREA, this.onAIGotArea, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CAMPAIGN_STARTED, this.onCampaignStarted, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CANCEL_CAMPAIGN, this.onCancelCampaign, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.MOVE_SOLDIERS_STARTED, this.onMoveSoldiersStarted, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CHECK_AI_CAN_ATTACK, this.onCheckAICanAttack, this);
        this.view.on("pointerdown", this.onPointerDown, this);
        this.view.on("pointerup", this.onPointerUp, this);
        this.view.on("pointerupoutside", this.onPointerUpOutSide, this);
        this.view.pointView.on("pointerover", this.onPointerMove, this);
    };
    AreaController.prototype.onPointerDown = function (event) {
        if (!GameStateModel_1.gameSateModel.readyActive && this.areaBusy === 1) {
            GameStateModel_1.gameSateModel.readyActive = true;
            GameStateModel_1.gameSateModel.attackAreas.push(this.view.areaId);
            this.isAttack = true;
            var targetPoint = new PIXI.Point(this.view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var arrowData = {
                points: [event.data.global, targetPoint],
                index: this.view.areaId
            };
            this.dispatcher.emit(GameEvents_1.GameEvents.CAMPAIGN_READY, arrowData);
        }
    };
    AreaController.prototype.onPointerMove = function (event) {
        if (GameStateModel_1.gameSateModel.readyActive && this.areaBusy === 1 && !this.isAttack) {
            GameStateModel_1.gameSateModel.readyActive = true;
            GameStateModel_1.gameSateModel.attackAreas.push(this.view.areaId);
            this.isAttack = true;
            var targetPoint = new PIXI.Point(this.view.pointView.transform.worldTransform.tx + Settings_1.Settings.pointCenter, this.view.pointView.transform.worldTransform.ty + Settings_1.Settings.pointCenter);
            var arrowData = {
                points: [event.data.global, targetPoint],
                index: this.view.areaId
            };
            this.dispatcher.emit(GameEvents_1.GameEvents.ADD_CAMPAIGN, arrowData);
        }
    };
    AreaController.prototype.onPointerUp = function () {
        if (GameStateModel_1.gameSateModel.readyActive && this.areaBusy != 1) {
            GameStateModel_1.gameSateModel.targetPlayerAttack = this.view.areaId;
            this.dispatcher.emit(GameEvents_1.GameEvents.STAR_CAMPAIGN);
        }
        else if (GameStateModel_1.gameSateModel.readyActive && this.areaBusy === 1) {
            if (GameStateModel_1.gameSateModel.attackAreas.length === 1 && GameStateModel_1.gameSateModel.attackAreas[0] === this.view.areaId) {
                this.dispatcher.emit(GameEvents_1.GameEvents.CANCEL_CAMPAIGN);
            }
            else {
                GameStateModel_1.gameSateModel.targetPlayerMove = this.view.areaId;
                this.dispatcher.emit(GameEvents_1.GameEvents.MOVE_SOLDIERS);
            }
        }
    };
    AreaController.prototype.onPointerUpOutSide = function () {
        var _this = this;
        setTimeout(function () {
            if (GameStateModel_1.gameSateModel.readyActive && GameStateModel_1.gameSateModel.targetPlayerAttack < 0) {
                _this.dispatcher.emit(GameEvents_1.GameEvents.CANCEL_CAMPAIGN);
            }
        }, Settings_1.Settings.delay.pointerUpOutSide);
    };
    AreaController.prototype.onPlayerGotArea = function (playerAreas) {
        if (this.view.areaId === playerAreas) {
            this.view.setPlayerGot();
            this.areaBusy = 1;
            this.pointController.pointBusy = 1;
            GameStateModel_1.gameSateModel.playerAreas.push(playerAreas);
        }
    };
    AreaController.prototype.onAIGotArea = function (aiAreas) {
        if (this.view.areaId === aiAreas) {
            this.view.setAIGot();
            this.areaBusy = 2;
            this.pointController.pointBusy = 2;
            var indexAttackRemove = GameStateModel_1.gameSateModel.attackAreas.indexOf(aiAreas);
            if (indexAttackRemove > -1) {
                GameStateModel_1.gameSateModel.attackAreas.splice(indexAttackRemove, 1);
            }
            this.dispatcher.emit(GameEvents_1.GameEvents.AI_CAPTURE_PLAYER, aiAreas);
        }
    };
    AreaController.prototype.onCampaignStarted = function () {
        this.deactivateAttack();
    };
    AreaController.prototype.onCancelCampaign = function () {
        this.deactivateAttack();
    };
    AreaController.prototype.onMoveSoldiersStarted = function () {
        this.deactivateAttack();
    };
    AreaController.prototype.deactivateAttack = function () {
        GameStateModel_1.gameSateModel.readyActive = false;
        GameStateModel_1.gameSateModel.attackAreas = [];
        GameStateModel_1.gameSateModel.targetPlayerAttack = -1;
        GameStateModel_1.gameSateModel.targetPlayerMove = -1;
        if (this.isAttack && this.areaBusy === 1) {
            this.isAttack = false;
        }
    };
    AreaController.prototype.onCheckAICanAttack = function () {
        var _this = this;
        var isAI = this.areaBusy === 2;
        var soldiersData = {
            index: this.view.areaId,
            soldierAmount: this.pointController.soldiersAmount,
            isEnemy: !isAI
        };
        setTimeout(function () {
            _this.dispatcher.emit(GameEvents_1.GameEvents.CHECK_AREA_SOLDIERS, soldiersData);
        }, Settings_1.Settings.delay.eventDelay);
    };
    return AreaController;
}(ComponentController_1.ComponentController));
exports.AreaController = AreaController;
//# sourceMappingURL=AreaController.js.map
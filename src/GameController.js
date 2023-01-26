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
exports.GameController = void 0;
var ComponentController_1 = require("./common/ComponentController");
var PIXI = __importStar(require("pixi.js"));
var GameEvents_1 = require("./GameEvents");
var ArrowView_1 = require("./arrow/ArrowView");
var resources_1 = require("./resources");
var ArrowController_1 = require("./arrow/ArrowController");
var GameStateModel_1 = require("./GameStateModel");
var SoldiersView_1 = require("./soldiers/SoldiersView");
var SoldiersController_1 = require("./soldiers/SoldiersController");
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController(arrowContainer, soldierContainer) {
        var _this = _super.call(this) || this;
        _this.arrows = [];
        _this.soldiers = [];
        _this.arrowContainer = arrowContainer;
        _this.soldierContainer = soldierContainer;
        _this.init();
        _this.addListeners();
        return _this;
    }
    GameController.prototype.addListeners = function () {
        this.dispatcher.addListener(GameEvents_1.GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CAMPAIGN_READY, this.onCampaignReady, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.ADD_CAMPAIGN, this.onAddCampaign, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.ADD_SOLDIER_ATTACK, this.onAddSoldierAttack, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.ADD_AI_ATTACK, this.onAIAttack, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.AI_CAPTURE_PLAYER, this.onAICapturePlayer, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.ADD_SOLDIER_MOVE, this.onAddSoldierMove, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.CANCEL_CAMPAIGN, this.onCancelCampaign, this);
        this.dispatcher.addListener(GameEvents_1.GameEvents.SOLDIERS_ENDED, this.onSoldiersEnded, this);
    };
    GameController.prototype.init = function () {
        this.clearArrows();
        this.clearSoldiers();
    };
    GameController.prototype.clearArrows = function () {
        this.arrows = [];
        this.arrowContainer.removeChildren();
        GameStateModel_1.gameSateModel.arrowsActivated = false;
    };
    GameController.prototype.clearSoldiers = function () {
        this.soldiers = [];
        this.soldierContainer.removeChildren();
    };
    GameController.prototype.onCampaignReady = function (arrowData) {
        this.addArrow(arrowData);
    };
    GameController.prototype.onAddCampaign = function (arrowData) {
        this.addArrow(arrowData);
    };
    GameController.prototype.onAIAttack = function (soldierAttackData) {
        this.addSoldiers(soldierAttackData, true);
    };
    GameController.prototype.onAddSoldierAttack = function (soldierAttackData) {
        this.clearArrows();
        this.addSoldiers(soldierAttackData);
    };
    GameController.prototype.onAICapturePlayer = function (aiArea) {
        this.removeArrowCaptured(aiArea);
    };
    GameController.prototype.onCancelCampaign = function () {
        this.clearArrows();
    };
    GameController.prototype.onAddSoldierMove = function (soldierAttackData) {
        this.clearArrows();
        this.addSoldiers(soldierAttackData);
    };
    GameController.prototype.onSoldiersEnded = function (soldierViewIndex) {
        this.soldierContainer.removeChild(this.soldiers[soldierViewIndex]);
    };
    GameController.prototype.addArrow = function (arrowData) {
        var arrowSprite = new PIXI.Sprite(PIXI.Texture.from(resources_1.ImageAssets.arrow));
        var currentArrow = new ArrowView_1.ArrowView(arrowSprite, arrowData.points[0], arrowData.points[1], arrowData.index);
        var currentArrowController = new ArrowController_1.ArrowController(currentArrow);
        this.arrows.push(currentArrow);
        this.arrowContainer.addChild(currentArrow);
        GameStateModel_1.gameSateModel.arrowsActivated = true;
    };
    GameController.prototype.removeArrowCaptured = function (aiArea) {
        for (var indexArrow = 0; indexArrow < this.arrows.length; indexArrow++) {
            if (aiArea === this.arrows[indexArrow].index) {
                this.arrowContainer.removeChild(this.arrows[indexArrow]);
                this.arrows.splice(indexArrow, 1);
            }
        }
    };
    GameController.prototype.addSoldiers = function (soldierAttackData, isAI) {
        if (isAI === void 0) { isAI = false; }
        if (soldierAttackData.attackAreas != soldierAttackData.targetPlayerAttack) {
            var currentSoldiersView = new SoldiersView_1.SoldiersView();
            var currentSoldiersController = new SoldiersController_1.SoldiersController(currentSoldiersView, soldierAttackData, this.soldiers.length, isAI);
            this.soldiers.push(currentSoldiersView);
            this.soldierContainer.addChild(currentSoldiersView);
        }
    };
    return GameController;
}(ComponentController_1.ComponentController));
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map
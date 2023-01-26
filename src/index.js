"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var PIXI = __importStar(require("pixi.js"));
require("./style.css");
var EventDispatcher_1 = require("./common/EventDispatcher");
var resources_1 = require("./resources");
var GameController_1 = require("./GameController");
var GameEvents_1 = require("./GameEvents");
var SceneController_1 = require("./scene/SceneController");
var PlayerController_1 = require("./player/PlayerController");
var Settings_1 = require("./Settings");
var GameStateModel_1 = require("./GameStateModel");
var PrimitiveAIController_1 = require("./ai/PrimitiveAIController");
var gameWidth = 800;
var gameHeight = 700;
var canvas = (document.getElementById("renderCanvas"));
var canvasWrapper = (document.getElementById("canvas-wrapper"));
exports.app = new PIXI.Application({
    backgroundColor: 0xffddcc,
    view: canvas,
    width: gameWidth,
    height: gameHeight
});
var stage = exports.app.stage;
var dispatcher = EventDispatcher_1.EventDispatcher;
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var updateSoldiersAmountTicker, updateAITickerCanAttack, areaContainer, soldierContainer, arrowContainer, sceneController, gameController, playerController, aiController, pointerListenerAdded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateSoldiersAmountTicker = 0;
                updateAITickerCanAttack = 0;
                return [4 /*yield*/, loadGameAssets()];
            case 1:
                _a.sent();
                areaContainer = new PIXI.Container();
                stage.addChild(areaContainer);
                soldierContainer = new PIXI.Container();
                stage.addChild(soldierContainer);
                arrowContainer = new PIXI.Container();
                stage.addChild(arrowContainer);
                sceneController = new SceneController_1.SceneController(areaContainer);
                gameController = new GameController_1.GameController(arrowContainer, soldierContainer);
                playerController = new PlayerController_1.PlayerController();
                aiController = new PrimitiveAIController_1.PrimitiveAIController();
                pointerListenerAdded = false;
                // canvas resizer
                resizeCanvas();
                // main loop
                exports.app.ticker.add(function (delta) {
                    updateSoldiersAmountTicker++;
                    updateAITickerCanAttack++;
                    if (updateSoldiersAmountTicker > Settings_1.Settings.updateSoldiersTicker) {
                        dispatcher.emit(GameEvents_1.GameEvents.EMIT_SOLDIERS);
                        updateSoldiersAmountTicker = 0;
                    }
                    if (updateAITickerCanAttack > Settings_1.Settings.updateSoldiersTicker) {
                        dispatcher.emit(GameEvents_1.GameEvents.CHECK_AI_CAN_ATTACK);
                        updateAITickerCanAttack = 0;
                    }
                    if (GameStateModel_1.gameSateModel.arrowsActivated && !pointerListenerAdded) {
                        pointerListenerAdded = true;
                        exports.app.renderer.plugins.interaction.on('pointermove', onPointerMove);
                    }
                    else if (!GameStateModel_1.gameSateModel.arrowsActivated && pointerListenerAdded) {
                        pointerListenerAdded = false;
                        exports.app.renderer.plugins.interaction.off('pointermove', onPointerMove);
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
function loadGameAssets() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) {
                    var loader = PIXI.Loader.shared;
                    resources_1.imageAssetsList.forEach(function (item) { return loader.add(item); });
                    resources_1.imageAssetsAreaList.forEach(function (item) { return loader.add(item); });
                    loader.onComplete.once(function () {
                        res();
                    });
                    loader.onError.once(function () {
                        rej();
                    });
                    loader.load();
                })];
        });
    });
}
// simple resize
function resizeCanvas() {
    var resize = function () {
        var ratio = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        var newWidth = Math.ceil(gameWidth * ratio);
        var newHeight = Math.ceil(gameHeight * ratio);
        canvasWrapper.style.top = (window.innerHeight - newHeight) / 2 + 'px';
        canvasWrapper.style.left = (window.innerWidth - newWidth) / 2 + 'px';
        canvasWrapper.style.width = newWidth + "px";
        canvasWrapper.style.height = newHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);
}
function onPointerMove(event) {
    dispatcher.emit(GameEvents_1.GameEvents.UPDATE_ARROW_POSITION, event.data.global);
}
//# sourceMappingURL=index.js.map
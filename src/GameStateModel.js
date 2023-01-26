"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSateModel = exports.GameStateModel = void 0;
var GameStateModel = /** @class */ (function () {
    function GameStateModel() {
        this._isGameStarted = false;
        this._playerAreas = [];
        this._aiAreas = [];
        this._attackAreas = [];
        this._readyActive = false;
        this._arrowsActivated = false;
        this._targetPlayerAttack = -1;
        this._targetPlayerMove = -1;
    }
    GameStateModel.prototype.init = function () {
        this._isGameStarted = false;
        this._playerAreas = [];
        this._aiAreas = [];
    };
    Object.defineProperty(GameStateModel.prototype, "isGameStarted", {
        get: function () {
            return this._isGameStarted;
        },
        set: function (value) {
            this._isGameStarted = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "playerAreas", {
        get: function () {
            return this._playerAreas;
        },
        set: function (playerAreas) {
            this._playerAreas = playerAreas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "aiAreas", {
        get: function () {
            return this._aiAreas;
        },
        set: function (aiAreas) {
            this._aiAreas = aiAreas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "attackAreas", {
        get: function () {
            return this._attackAreas;
        },
        set: function (value) {
            this._attackAreas = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "targetPlayerAttack", {
        get: function () {
            return this._targetPlayerAttack;
        },
        set: function (value) {
            this._targetPlayerAttack = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "targetPlayerMove", {
        get: function () {
            return this._targetPlayerMove;
        },
        set: function (value) {
            this._targetPlayerMove = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "arrowsActivated", {
        get: function () {
            return this._arrowsActivated;
        },
        set: function (value) {
            this._arrowsActivated = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameStateModel.prototype, "readyActive", {
        get: function () {
            return this._readyActive;
        },
        set: function (value) {
            this._readyActive = value;
        },
        enumerable: false,
        configurable: true
    });
    return GameStateModel;
}());
exports.GameStateModel = GameStateModel;
var gameSateModel = new GameStateModel();
exports.gameSateModel = gameSateModel;
//# sourceMappingURL=GameStateModel.js.map
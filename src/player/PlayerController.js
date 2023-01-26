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
exports.PlayerController = void 0;
var GameEvents_1 = require("../GameEvents");
var ComponentController_1 = require("../common/ComponentController");
var Settings_1 = require("../Settings");
var GameStateModel_1 = require("../GameStateModel");
var PlayerController = /** @class */ (function (_super) {
    __extends(PlayerController, _super);
    function PlayerController() {
        var _this = _super.call(this) || this;
        _this.gameModel = GameStateModel_1.gameSateModel;
        _this.init();
        return _this;
    }
    PlayerController.prototype.init = function () {
        var playerAreaIndex = Math.floor(Math.random() * Settings_1.Settings.areas.length);
        this.gameModel.playerAreas.push(playerAreaIndex);
        this.dispatcher.emit(GameEvents_1.GameEvents.PLAYER_GOT_AREA, playerAreaIndex);
    };
    return PlayerController;
}(ComponentController_1.ComponentController));
exports.PlayerController = PlayerController;
//# sourceMappingURL=PlayerController.js.map
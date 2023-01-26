import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {Settings} from "../Settings";
import {gameSateModel, GameStateModel} from "../GameStateModel";

export class PlayerController extends ComponentController {

    private gameModel: GameStateModel;

    constructor() {
        super();
        this.gameModel = gameSateModel;
        this.init();
    }

    protected init() {
        const playerAreaIndex: number = Math.floor(Math.random() * Settings.areas.length);
        this.gameModel.playerAreas.push(playerAreaIndex);
        this.dispatcher.emit(GameEvents.PLAYER_GOT_AREA, playerAreaIndex);
    }
}
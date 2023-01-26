import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {PointView} from "./PointView";
import {Settings} from "../Settings";
import {ISoldierFightData} from "../soldiers/ISoldierAttackData";

export class PointController extends ComponentController {

    protected view: PointView;
    public pointBusy: number = 0; // 0 - base, 1 - player, 2 - ai
    public soldiersAmount: number = Settings.startSoldierAmount;

    constructor(view: PointView) {
        super()
        this.view = view;
        this.addListeners();
        this.init();
    }

    protected addListeners() {
        this.dispatcher.addListener(GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents.EMIT_SOLDIERS, this.onEmitSoldiers, this);
        this.dispatcher.addListener(GameEvents.DECREASE_SOLDIER_AT_HOME, this.onDecreaseSoldierAtHome, this);
        this.dispatcher.addListener(GameEvents.SOLDIER_FIGHT_ENEMY, this.onSoldierFightEnemy, this);
    }

    protected init() {
        this.view.init();
        this.view.setSoldierAmount(this.soldiersAmount);
    }

    protected onEmitSoldiers() {
        if (this.soldiersAmount < Settings.startSoldierAmount && this.pointBusy === 0) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
        } else if (this.pointBusy > 0 && this.soldiersAmount < Settings.maxSoldierAmount) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
            this.dispatcher.emit(GameEvents.BIRTH_SOLDIER_ON_FIGHT_POINT, this.view.pointId);
        }
    }

    protected onDecreaseSoldierAtHome(attackArea: number) {
        if (this.view.pointId === attackArea) {
            this.soldiersAmount--;
            this.view.setSoldierAmount(this.soldiersAmount);
        }
    }

    protected onSoldierFightEnemy(soldierFightData: ISoldierFightData) {
        const whichSoldiers: number = soldierFightData.isAI ? 2 : 1;
        if (this.view.pointId === soldierFightData.targetPlayerAttack && this.pointBusy != whichSoldiers) {
            this.soldiersAmount--;
            if (this.soldiersAmount < 0) {
                this.pointBusy = whichSoldiers;
                this.soldiersAmount = Math.abs(this.soldiersAmount);
                const gotEvent: string = soldierFightData.isAI ? GameEvents.AI_GOT_AREA : GameEvents.PLAYER_GOT_AREA;
                this.dispatcher.emit(gotEvent, soldierFightData.targetPlayerAttack);
            }
            this.view.setSoldierAmount(this.soldiersAmount);
        } else if (this.view.pointId === soldierFightData.targetPlayerAttack && this.pointBusy === whichSoldiers) {
            this.soldiersAmount++;
            this.view.setSoldierAmount(this.soldiersAmount);
        }
    }

}
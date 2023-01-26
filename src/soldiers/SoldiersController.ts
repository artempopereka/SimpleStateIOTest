import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {Settings} from "../Settings";
import {SoldiersView} from "./SoldiersView";
import {ISoldierAttackData, ISoldierFightData} from "./ISoldierAttackData";

export class SoldiersController extends ComponentController {

    protected view: SoldiersView;
    protected soldierAttackData: ISoldierAttackData;
    protected soldiersAdded: number = 0;
    protected soldierViewIndex: number;
    protected isAI: boolean;

    constructor(view: SoldiersView, soldierAttackData: ISoldierAttackData, soldierViewIndex: number, isAI: boolean) {
        super()
        this.view = view;
        this.soldierAttackData = soldierAttackData;
        this.soldierViewIndex = soldierViewIndex;
        this.isAI = isAI;
        this.addListeners();
        this.init();
    }

    protected addListeners() {
        this.view.on(GameEvents.SOLDIER_FIGHT_ENEMY, this.onSoldierFightEnemy, this);
        this.view.on(GameEvents.SOLDIERS_ENDED, this.onSoldierEnded, this);
        this.dispatcher.addListener(GameEvents.BIRTH_SOLDIER_ON_FIGHT_POINT, this.onBirthSoldierOnFightPoint, this);
    }

    protected init() {
        const wayLength: number = Math.sqrt(Math.pow(Math.abs(this.soldierAttackData.pointAttack.y - this.soldierAttackData.pointAttacked.y), 2) +
            Math.pow(Math.abs(this.soldierAttackData.pointAttack.x - this.soldierAttackData.pointAttacked.x), 2));
        const duration: number = (wayLength / Settings.durationWaySection) * Settings.durationWaySectionTime;
        this.view.init(this.soldierAttackData.pointAttack, this.soldierAttackData.pointAttacked, duration);
        this.addSolders();
    }

    protected addSolders() {
        if (this.soldiersAdded < this.soldierAttackData.soldiersAmount) {
            this.soldiersAdded++;
            this.dispatcher.emit(GameEvents.DECREASE_SOLDIER_AT_HOME, this.soldierAttackData.attackAreas);
            this.view.addSoldiers(this.soldiersAdded === this.soldierAttackData.soldiersAmount);
            setTimeout(() => {
                this.addSolders();
            }, Settings.delay.soldierAdd);
        }
    }

    protected onSoldierFightEnemy() {
        let soldierFightData: ISoldierFightData = {
            targetPlayerAttack: this.soldierAttackData.targetPlayerAttack,
            isAI: this.isAI
        }
        this.dispatcher.emit(GameEvents.SOLDIER_FIGHT_ENEMY, soldierFightData);
    }

    protected onSoldierEnded() {
        this.dispatcher.emit(GameEvents.SOLDIERS_ENDED, this.soldierViewIndex);
    }

    protected onBirthSoldierOnFightPoint(pointId: number) {
        if (pointId === this.soldierAttackData.attackAreas) {
            this.soldierAttackData.soldiersAmount++;
        }
    }

}
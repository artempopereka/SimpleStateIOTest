import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {Settings} from "../Settings";
import {gameSateModel, GameStateModel} from "../GameStateModel";
import {IAIAttackData, IAISoldierData} from "./IAISoldierData";

export class PrimitiveAIController extends ComponentController {

    private gameModel: GameStateModel;
    private enemySoldiers: IAISoldierData[] = [];
    private aiSoldiers: IAISoldierData[] = [];

    constructor() {
        super();
        this.gameModel = gameSateModel;
        this.init();
        this.addListeners();
    }

    protected addListeners() {
        this.dispatcher.addListener(GameEvents.CHECK_AI_CAN_ATTACK, this.onCheckAICanAttack, this);
        this.dispatcher.addListener(GameEvents.CHECK_AREA_SOLDIERS, this.onCheckAreaSoldiers, this);
    }

    protected init() {
        this.chooseAIArea();
    }

    protected chooseAIArea(): void {
        const aiAreaIndex: number = this.randomAIArea();
        if (this.gameModel.playerAreas[0] === aiAreaIndex) {
            this.chooseAIArea();
        } else {
            const aiAreas: number[] = this.gameModel.aiAreas;
            aiAreas.push(aiAreaIndex);
            this.gameModel.aiAreas.push(aiAreaIndex);
            this.dispatcher.emit(GameEvents.AI_GOT_AREA, aiAreaIndex);
        }
    }

    protected randomAIArea(): number {
        return Math.floor(Math.random() * Settings.areas.length);
    }

    protected onCheckAICanAttack() {
        this.enemySoldiers = [];
        this.aiSoldiers = [];
        if (Math.floor(Math.random() * Settings.phaseAIWantAttack) > 0) {
            setTimeout(() => {
                this.checkAreasCanCapture();
            }, Settings.delay.soldierAdd);
        }
    }

    protected onCheckAreaSoldiers(soldiersData: IAISoldierData) {
        if (soldiersData.isEnemy) {
            this.enemySoldiers.push(soldiersData);
        } else {
            this.aiSoldiers.push(soldiersData);
        }
    }

    protected checkAreasCanCapture() {
        this.aiSoldiers = this.shuffle(this.aiSoldiers);
        this.enemySoldiers = this.shuffle(this.enemySoldiers);
        label:
        for (let indexAISoldiers: number = 0; indexAISoldiers < this.aiSoldiers.length; indexAISoldiers++) {
            for (let indexEnemySoldiers: number = 0; indexEnemySoldiers < this.enemySoldiers.length; indexEnemySoldiers++) {
                if (this.aiSoldiers[indexAISoldiers].soldierAmount > this.enemySoldiers[indexEnemySoldiers].soldierAmount) {
                    let attackData: IAIAttackData = {
                        attackArea: this.aiSoldiers[indexAISoldiers].index,
                        targetAttack: this.enemySoldiers[indexEnemySoldiers].index
                    }
                    this.dispatcher.emit(GameEvents.AI_STAR_CAMPAIGN, attackData);
                    break label;
                }
            }
        }
    }

    protected shuffle(soldiersData: IAISoldierData[]): IAISoldierData[] {
        let counter = soldiersData.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = soldiersData[counter];
            soldiersData[counter] = soldiersData[index];
            soldiersData[index] = temp;
        }

        return soldiersData;
    }
}
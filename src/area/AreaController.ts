import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {AreaView} from "./AreaView";
import {PointController} from "../point/PointController";
import {gameSateModel} from "../GameStateModel";
import {Polygons} from "../Polygons";
import {Settings} from "../Settings";
import {IAISoldierData} from "../ai/IAISoldierData";
import {IArrowData} from "../arrow/IArrowData";

export class AreaController extends ComponentController {

    public view: AreaView;
    public pointController: PointController;
    protected areaBusy: number = 0; // 0 - base; 1 - player; 2 - ai;
    protected isAttack: boolean = false;

    constructor(view: AreaView) {
        super()
        this.view = view;
        this.pointController = new PointController(this.view.pointView);
        this.init();
        this.addListeners();
    }

    protected init() {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.hitArea = new PIXI.Polygon(Polygons.areas[this.view.areaId]);
        this.view.cursor = "default";
        this.view.pointView.interactive = true;
        this.view.init();
    }

    protected addListeners() {
        this.dispatcher.addListener(GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents.PLAYER_GOT_AREA, this.onPlayerGotArea, this);
        this.dispatcher.addListener(GameEvents.AI_GOT_AREA, this.onAIGotArea, this);
        this.dispatcher.addListener(GameEvents.CAMPAIGN_STARTED, this.onCampaignStarted, this);
        this.dispatcher.addListener(GameEvents.CANCEL_CAMPAIGN, this.onCancelCampaign, this);
        this.dispatcher.addListener(GameEvents.MOVE_SOLDIERS_STARTED, this.onMoveSoldiersStarted, this);
        this.dispatcher.addListener(GameEvents.CHECK_AI_CAN_ATTACK, this.onCheckAICanAttack, this);
        this.view.on("pointerdown", this.onPointerDown, this);
        this.view.on("pointerup", this.onPointerUp, this);
        this.view.on("pointerupoutside", this.onPointerUpOutSide, this);
        this.view.pointView.on("pointerover", this.onPointerMove, this);
    }

    protected onPointerDown(event: PIXI.InteractionEvent) {
        if (!gameSateModel.readyActive && this.areaBusy === 1) {
            gameSateModel.readyActive = true;
            gameSateModel.attackAreas.push(this.view.areaId);
            this.isAttack = true;
            const targetPoint: PIXI.Point = new PIXI.Point(this.view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.view.pointView.transform.worldTransform.ty + Settings.pointCenter);
            let arrowData: IArrowData = {
                points: [event.data.global, targetPoint],
                index: this.view.areaId
            }
            this.dispatcher.emit(GameEvents.CAMPAIGN_READY, arrowData);
        }
    }

    protected onPointerMove(event: PIXI.InteractionEvent) {
        if (gameSateModel.readyActive && this.areaBusy === 1 && !this.isAttack) {
            gameSateModel.readyActive = true;
            gameSateModel.attackAreas.push(this.view.areaId);
            this.isAttack = true;
            const targetPoint: PIXI.Point = new PIXI.Point(this.view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.view.pointView.transform.worldTransform.ty + Settings.pointCenter);
            let arrowData: IArrowData = {
                points: [event.data.global, targetPoint],
                index: this.view.areaId
            }
            this.dispatcher.emit(GameEvents.ADD_CAMPAIGN, arrowData);
        }
    }

    protected onPointerUp() {
        if (gameSateModel.readyActive && this.areaBusy != 1) {
            gameSateModel.targetPlayerAttack = this.view.areaId;
            this.dispatcher.emit(GameEvents.STAR_CAMPAIGN);
        } else if (gameSateModel.readyActive && this.areaBusy === 1) {
            if (gameSateModel.attackAreas.length === 1 && gameSateModel.attackAreas[0] === this.view.areaId) {
                this.dispatcher.emit(GameEvents.CANCEL_CAMPAIGN);
            } else {
                gameSateModel.targetPlayerMove = this.view.areaId;
                this.dispatcher.emit(GameEvents.MOVE_SOLDIERS);
            }
        }

    }

    protected onPointerUpOutSide() {
        setTimeout(() => {
            if (gameSateModel.readyActive && gameSateModel.targetPlayerAttack < 0) {
                this.dispatcher.emit(GameEvents.CANCEL_CAMPAIGN);
            }
        }, Settings.delay.pointerUpOutSide)
    }

    protected onPlayerGotArea(playerAreas: number) {
        if (this.view.areaId === playerAreas) {
            this.view.setPlayerGot();
            this.areaBusy = 1;
            this.pointController.pointBusy = 1;
            gameSateModel.playerAreas.push(playerAreas);
        }
    }

    protected onAIGotArea(aiAreas: number) {
        if (this.view.areaId === aiAreas) {
            this.view.setAIGot();
            this.areaBusy = 2;
            this.pointController.pointBusy = 2;
            const indexAttackRemove = gameSateModel.attackAreas.indexOf(aiAreas);
            if (indexAttackRemove > -1) {
                gameSateModel.attackAreas.splice(indexAttackRemove, 1);
            }
            this.dispatcher.emit(GameEvents.AI_CAPTURE_PLAYER, aiAreas);
        }
    }

    protected onCampaignStarted() {
        this.deactivateAttack();
    }

    protected onCancelCampaign() {
        this.deactivateAttack();
    }

    protected onMoveSoldiersStarted() {
        this.deactivateAttack();
    }

    protected deactivateAttack() {
        gameSateModel.readyActive = false;
        gameSateModel.attackAreas = [];
        gameSateModel.targetPlayerAttack = -1;
        gameSateModel.targetPlayerMove = -1;
        if (this.isAttack && this.areaBusy === 1) {
            this.isAttack = false;
        }
    }

    protected onCheckAICanAttack() {
        const isAI = this.areaBusy === 2;
        let soldiersData: IAISoldierData = {
            index: this.view.areaId,
            soldierAmount: this.pointController.soldiersAmount,
            isEnemy: !isAI
        }
        setTimeout(() => {
            this.dispatcher.emit(GameEvents.CHECK_AREA_SOLDIERS, soldiersData);
        }, Settings.delay.eventDelay);
    }

}

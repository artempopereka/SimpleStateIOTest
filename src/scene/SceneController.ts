import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {AreaView} from "../area/AreaView";
import {GameEvents} from "../GameEvents";
import {Settings} from "../Settings";
import {imageAssetsAreaList} from "../resources";
import {AreaController} from "../area/AreaController";
import {gameSateModel} from "../GameStateModel";
import {ISoldierAttackData} from "../soldiers/ISoldierAttackData";
import {IAIAttackData} from "../ai/IAISoldierData";

export class SceneController extends ComponentController {

    private areas: AreaView[] = [];
    private areaContainer: PIXI.Container;
    private areaControllers: AreaController[] = [];

    constructor(areaContainer: PIXI.Container) {
        super();
        this.areaContainer = areaContainer;
        this.init();
        this.addListeners();
    }

    public init(): void {
        this.clearAreas();
        this.generateLevel();
    }

    protected addListeners(): void {
        this.dispatcher.addListener(GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents.STAR_CAMPAIGN, this.onStartCampaign, this);
        this.dispatcher.addListener(GameEvents.AI_STAR_CAMPAIGN, this.onAIStartCampaign, this);
        this.dispatcher.addListener(GameEvents.MOVE_SOLDIERS, this.onMoveSoldiers, this);
    }

    protected clearAreas(): void {
        this.areas = [];
        this.areaContainer.removeChildren();
    }

    protected generateLevel() {
        for (let indexArea: number = 0; indexArea < Settings.areas.length; indexArea++) {
            const areaSprite = new PIXI.Sprite(PIXI.Texture.from(imageAssetsAreaList[indexArea]));
            const currentArea: AreaView = new AreaView(areaSprite, indexArea);
            const currentAreaController: AreaController = new AreaController(currentArea);
            this.areas.push(currentArea);
            this.areaControllers.push(currentAreaController);
            this.areaContainer.addChild(currentArea);
        }
    }

    protected onAIStartCampaign(attackData: IAIAttackData) {
        const soldierAmount: number = this.areaControllers[attackData.attackArea].pointController.soldiersAmount;
        const pointAttack: PIXI.Point = new PIXI.Point(
            this.areaControllers[attackData.attackArea].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
            this.areaControllers[attackData.attackArea].view.pointView.transform.worldTransform.ty + Settings.pointCenter
        );
        const pointAttacked: PIXI.Point = new PIXI.Point(
            this.areaControllers[attackData.targetAttack].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
            this.areaControllers[attackData.targetAttack].view.pointView.transform.worldTransform.ty + Settings.pointCenter
        );
        let soldierAttackData: ISoldierAttackData = {
            soldiersAmount: soldierAmount,
            pointAttack: pointAttack,
            pointAttacked: pointAttacked,
            attackAreas: attackData.attackArea,
        targetPlayerAttack: attackData.targetAttack
        }
        this.dispatcher.emit(GameEvents.ADD_AI_ATTACK, soldierAttackData);
    }

    protected onStartCampaign() {
        for (let indexAreaAttack: number = 0; indexAreaAttack < gameSateModel.attackAreas.length; indexAreaAttack++) {
            const soldierAmount: number = this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].pointController.soldiersAmount;
            const pointAttack: PIXI.Point = new PIXI.Point(
                this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.ty + Settings.pointCenter
            );
            const pointAttacked: PIXI.Point = new PIXI.Point(
                this.areaControllers[gameSateModel.targetPlayerAttack].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.areaControllers[gameSateModel.targetPlayerAttack].view.pointView.transform.worldTransform.ty + Settings.pointCenter
            );
            let soldierAttackData: ISoldierAttackData = {
                soldiersAmount: soldierAmount,
                pointAttack: pointAttack,
                pointAttacked: pointAttacked,
                attackAreas: gameSateModel.attackAreas[indexAreaAttack],
                targetPlayerAttack: gameSateModel.targetPlayerAttack
            }
            this.dispatcher.emit(GameEvents.ADD_SOLDIER_ATTACK, soldierAttackData);
        }
        setTimeout(() => {
            this.dispatcher.emit(GameEvents.CAMPAIGN_STARTED);
        }, Settings.delay.pointerUpOutSide);
    }

    protected onMoveSoldiers() {
        for (let indexAreaAttack: number = 0; indexAreaAttack < gameSateModel.attackAreas.length; indexAreaAttack++) {
            const soldierAmount: number = this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].pointController.soldiersAmount;
            const pointAttack: PIXI.Point = new PIXI.Point(
                this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.areaControllers[gameSateModel.attackAreas[indexAreaAttack]].view.pointView.transform.worldTransform.ty + Settings.pointCenter
            );
            const pointAttacked: PIXI.Point = new PIXI.Point(
                this.areaControllers[gameSateModel.targetPlayerMove].view.pointView.transform.worldTransform.tx + Settings.pointCenter,
                this.areaControllers[gameSateModel.targetPlayerMove].view.pointView.transform.worldTransform.ty + Settings.pointCenter
            );
            let soldierAttackData: ISoldierAttackData = {
                soldiersAmount: soldierAmount,
                pointAttack: pointAttack,
                pointAttacked: pointAttacked,
                attackAreas: gameSateModel.attackAreas[indexAreaAttack],
                targetPlayerAttack: gameSateModel.targetPlayerMove
            }
            this.dispatcher.emit(GameEvents.ADD_SOLDIER_MOVE, soldierAttackData);
        }
        setTimeout(() => {
            this.dispatcher.emit(GameEvents.MOVE_SOLDIERS_STARTED);
        }, Settings.delay.pointerUpOutSide);
    }
}
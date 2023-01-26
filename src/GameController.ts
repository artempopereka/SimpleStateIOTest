import { ComponentController } from "./common/ComponentController";
import * as PIXI from "pixi.js";
import { GameEvents } from "./GameEvents";
import {ArrowView} from "./arrow/ArrowView";
import {Settings} from "./Settings";
import {ImageAssets} from "./resources";
import {ArrowController} from "./arrow/ArrowController";
import {gameSateModel} from "./GameStateModel";
import {SoldiersView} from "./soldiers/SoldiersView";
import {SoldiersController} from "./soldiers/SoldiersController";
import {AreaController} from "./area/AreaController";
import {ISoldierAttackData} from "./soldiers/ISoldierAttackData";
import {IArrowData} from "./arrow/IArrowData";

export class GameController extends ComponentController {

    private arrowContainer: PIXI.Container;
    private soldierContainer: PIXI.Container;
    private arrows: ArrowView[] = [];
    private soldiers: SoldiersView[] = [];

    constructor(arrowContainer: PIXI.Container, soldierContainer: PIXI.Container) {
        super();
        this.arrowContainer = arrowContainer;
        this.soldierContainer = soldierContainer;
        this.init();
        this.addListeners();
    }

    protected addListeners() {
        this.dispatcher.addListener(GameEvents.GAME_RESTART, this.init, this);
        this.dispatcher.addListener(GameEvents.CAMPAIGN_READY, this.onCampaignReady, this);
        this.dispatcher.addListener(GameEvents.ADD_CAMPAIGN, this.onAddCampaign, this);
        this.dispatcher.addListener(GameEvents.ADD_SOLDIER_ATTACK, this.onAddSoldierAttack, this);
        this.dispatcher.addListener(GameEvents.ADD_AI_ATTACK, this.onAIAttack, this);
        this.dispatcher.addListener(GameEvents.AI_CAPTURE_PLAYER, this.onAICapturePlayer, this);
        this.dispatcher.addListener(GameEvents.ADD_SOLDIER_MOVE, this.onAddSoldierMove, this);
        this.dispatcher.addListener(GameEvents.CANCEL_CAMPAIGN, this.onCancelCampaign, this);
        this.dispatcher.addListener(GameEvents.SOLDIERS_ENDED, this.onSoldiersEnded, this);
    }

    protected init(): void {
        this.clearArrows();
        this.clearSoldiers();
    }

    protected clearArrows(): void {
        this.arrows = [];
        this.arrowContainer.removeChildren();
        gameSateModel.arrowsActivated = false;
    }

    protected clearSoldiers(): void {
        this.soldiers = [];
        this.soldierContainer.removeChildren();
    }

    protected onCampaignReady(arrowData: IArrowData): void {
        this.addArrow(arrowData);
    }

    protected onAddCampaign(arrowData: IArrowData): void {
        this.addArrow(arrowData);
    }

    protected onAIAttack(soldierAttackData: ISoldierAttackData): void {
        this.addSoldiers(soldierAttackData, true);
    }

    protected onAddSoldierAttack(soldierAttackData: ISoldierAttackData): void {
        this.clearArrows();
        this.addSoldiers(soldierAttackData);
    }

    protected onAICapturePlayer(aiArea: number): void {
        this.removeArrowCaptured(aiArea);
    }

    protected onCancelCampaign(): void {
        this.clearArrows();
    }

    protected onAddSoldierMove(soldierAttackData: ISoldierAttackData): void {
        this.clearArrows();
        this.addSoldiers(soldierAttackData);
    }

    protected onSoldiersEnded(soldierViewIndex: number): void {
        this.soldierContainer.removeChild(this.soldiers[soldierViewIndex]);
    }

    protected addArrow(arrowData: IArrowData) {
        const arrowSprite = new PIXI.Sprite(PIXI.Texture.from(ImageAssets.arrow));
        const currentArrow: ArrowView = new ArrowView(arrowSprite, arrowData.points[0], arrowData.points[1], arrowData.index);
        const currentArrowController: ArrowController = new ArrowController(currentArrow);
        this.arrows.push(currentArrow);
        this.arrowContainer.addChild(currentArrow);
        gameSateModel.arrowsActivated = true;
    }

    protected removeArrowCaptured(aiArea: number) {
        for (let indexArrow: number = 0; indexArrow < this.arrows.length; indexArrow++) {
            if (aiArea === this.arrows[indexArrow].index) {
                this.arrowContainer.removeChild(this.arrows[indexArrow]);
                this.arrows.splice(indexArrow, 1);
            }
        }
    }

    protected addSoldiers(soldierAttackData: ISoldierAttackData, isAI: boolean = false) {
        if (soldierAttackData.attackAreas != soldierAttackData.targetPlayerAttack) {
            const currentSoldiersView: SoldiersView = new SoldiersView();
            const currentSoldiersController: SoldiersController = new SoldiersController(currentSoldiersView, soldierAttackData, this.soldiers.length, isAI);
            this.soldiers.push(currentSoldiersView);
            this.soldierContainer.addChild(currentSoldiersView);
        }
    }
}
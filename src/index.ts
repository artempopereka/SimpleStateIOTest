import * as PIXI from "pixi.js";
import "./style.css";
import { EventDispatcher } from './common/EventDispatcher';
import { ImageAssets, imageAssetsList, imageAssetsAreaList } from './resources';
import { GameController } from "./GameController";
import { GameEvents } from "./GameEvents";
import {SceneController} from "./scene/SceneController";
import {PlayerController} from "./player/PlayerController";
import {Settings} from "./Settings";
import {gameSateModel} from "./GameStateModel";
import {PrimitiveAIController} from "./ai/PrimitiveAIController";

const gameWidth = 800;
const gameHeight = 700;

const canvas: HTMLCanvasElement = (document.getElementById("renderCanvas")) as HTMLCanvasElement;
const canvasWrapper: HTMLElement = (document.getElementById("canvas-wrapper")) as HTMLElement;

export const app = new PIXI.Application({
    backgroundColor: 0xffddcc,
    view: canvas,
    width: gameWidth,
    height: gameHeight
});

const stage = app.stage;

let dispatcher = EventDispatcher;

window.onload = async (): Promise<void> => {

    let updateSoldiersAmountTicker: number = 0;
    let updateAITickerCanAttack: number = 0;

    await loadGameAssets();

    const areaContainer: PIXI.Container = new PIXI.Container();
    stage.addChild(areaContainer);

    const soldierContainer: PIXI.Container = new PIXI.Container();
    stage.addChild(soldierContainer);

    const arrowContainer: PIXI.Container = new PIXI.Container();
    stage.addChild(arrowContainer);

    const sceneController: SceneController = new SceneController(areaContainer);

    const gameController: GameController = new GameController(arrowContainer, soldierContainer);

    const playerController: PlayerController = new PlayerController();

    const aiController: PrimitiveAIController = new PrimitiveAIController();

    let pointerListenerAdded: boolean = false;

    // canvas resizer
    resizeCanvas();

    // main loop
    app.ticker.add(delta => {
        updateSoldiersAmountTicker++;
        updateAITickerCanAttack++;
        if (updateSoldiersAmountTicker > Settings.updateSoldiersTicker) {
            dispatcher.emit(GameEvents.EMIT_SOLDIERS);
            updateSoldiersAmountTicker = 0;
        }
        if (updateAITickerCanAttack > Settings.updateSoldiersTicker) {
            dispatcher.emit(GameEvents.CHECK_AI_CAN_ATTACK);
            updateAITickerCanAttack = 0;
        }
        if (gameSateModel.arrowsActivated && !pointerListenerAdded) {
            pointerListenerAdded = true;
            app.renderer.plugins.interaction.on( 'pointermove', onPointerMove );
        } else if (!gameSateModel.arrowsActivated && pointerListenerAdded) {
            pointerListenerAdded = false;
            app.renderer.plugins.interaction.off( 'pointermove', onPointerMove );
        }

    });
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        imageAssetsList.forEach(item => loader.add(item));
        imageAssetsAreaList.forEach(item => loader.add(item));

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

// simple resize
function resizeCanvas(): void {
    const resize = () => {

        const ratio = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        const newWidth = Math.ceil(gameWidth * ratio);
        const newHeight = Math.ceil(gameHeight * ratio);

        canvasWrapper.style.top = (window.innerHeight - newHeight) / 2 + 'px';
        canvasWrapper.style.left = (window.innerWidth - newWidth) / 2 + 'px';
        canvasWrapper.style.width = newWidth + "px";
        canvasWrapper.style.height = newHeight + "px";
    };

    resize();

    window.addEventListener("resize", resize);
}

function onPointerMove(event: PIXI.InteractionEvent): void {
    dispatcher.emit(GameEvents.UPDATE_ARROW_POSITION, event.data.global);
}

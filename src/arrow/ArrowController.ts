import { GameEvents } from "../GameEvents";
import * as PIXI from "pixi.js";
import {ComponentController} from "../common/ComponentController";
import {ArrowView} from "./ArrowView";

export class ArrowController extends ComponentController {

    protected view: ArrowView;

    constructor(view: ArrowView) {
        super()
        this.view = view;
        this.addListeners();
    }

    protected addListeners() {
        this.dispatcher.addListener(GameEvents.UPDATE_ARROW_POSITION, this.onUpdateArrowPosition, this);
    }

    protected onUpdateArrowPosition(point: PIXI.Point) {
        this.view.onUpdateViewPosition(point);
    }

}
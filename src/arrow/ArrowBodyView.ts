import * as PIXI from "pixi.js";
import {Settings} from "../Settings";

export class ArrowBodyView extends PIXI.Container {

    public arrowBodySprite: PIXI.Sprite;
    public centerPoint: PIXI.Point;

    constructor(sprite: PIXI.Sprite, centerPoint: PIXI.Point) {
        super();
        this.arrowBodySprite = sprite;
        this.centerPoint = centerPoint;
        this.init();
    }

    public init() {
        this.arrowBodySprite.alpha = 0.5;
        this.arrowBodySprite.tint = 0xcc00FF;
        this.arrowBodySprite.x = -Settings.arrowBodyOffset;
        this.arrowBodySprite.y = Settings.arrowBodyOffset;
        this.addChild(this.arrowBodySprite);
    }

    public updateBodyLength(length: number) {
        this.arrowBodySprite.height = length;
    }
}
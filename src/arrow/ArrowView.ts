import * as PIXI from "pixi.js";
import {Settings} from "../Settings";
import {ImageAssets} from "../resources";
import {ArrowBodyView} from "./ArrowBodyView";

export class ArrowView extends PIXI.Container {

    public arrowSprite: PIXI.Sprite;
    public arrowBodySprite?: ArrowBodyView;
    public centerPoint: PIXI.Point;
    public index: number;

    constructor(sprite: PIXI.Sprite, point: PIXI.Point, centerPoint: PIXI.Point, index: number) {
        super();
        this.arrowSprite = sprite;
        this.centerPoint = centerPoint;
        this.index = index;
        this.init(point);
    }

    public init(point: PIXI.Point) {
        const arrowBodySprite = new PIXI.Sprite(PIXI.Texture.from(ImageAssets.arrow_body));
        this.arrowBodySprite = new ArrowBodyView(arrowBodySprite, this.centerPoint);
        this.arrowSprite.anchor.set(0.5);
        this.arrowSprite.alpha = 0.5;
        this.arrowSprite.tint = 0xcc00FF;
        this.onUpdateViewPosition(point);
        this.addChild(this.arrowSprite);
        this.arrowSprite.addChild(this.arrowBodySprite);
    }

    public onUpdateViewPosition(point: PIXI.Point) {
        this.arrowSprite.x = point.x;
        this.arrowSprite.y = point.y;
        const angle = Math.atan2(point.y - this.centerPoint.y, point.x - this.centerPoint.x) + Settings.angelArrowUp;
        this.arrowSprite.rotation = angle;
        if (this.arrowBodySprite) {
            const bodyLength: number = Math.sqrt(Math.pow(Math.abs(point.y - this.centerPoint.y), 2) + Math.pow(Math.abs(point.x - this.centerPoint.x), 2));
            this.arrowBodySprite.updateBodyLength(bodyLength);
        }
    }
}
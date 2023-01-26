import * as PIXI from "pixi.js";
import {Settings} from "../Settings";

export class PointView extends PIXI.Container {

    public pointSprite: PIXI.Sprite;
    public pointId: number;
    public soldiersAmountText: PIXI.Text;

    constructor(sprite: PIXI.Sprite, pointId: number) {
        super();
        this.pointSprite = sprite;
        this.pointId = pointId;
        this.soldiersAmountText = new PIXI.Text(Settings.labelsStyle.emptyText, Settings.labelsStyle.style);
        this.init();
    }

    public init() {
        this.addChild(this.pointSprite);
        this.position.x = Settings.areas[this.pointId].point.position.x;
        this.position.y = Settings.areas[this.pointId].point.position.y;
        this.soldiersAmountText.x = Settings.labelsStyle.position.x;
        this.soldiersAmountText.y = Settings.labelsStyle.position.y;
        this.pointSprite.addChild(this.soldiersAmountText);
    }

    public setSoldierAmount(amount: number): void {
        this.soldiersAmountText.text = amount.toString();
    }
}
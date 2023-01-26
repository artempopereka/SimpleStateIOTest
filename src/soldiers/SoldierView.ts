import * as PIXI from "pixi.js";
import {Settings} from "../Settings";
import {ImageAssets} from "../resources";

export class SoldierView extends PIXI.Container {

    public soldierSprite: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.from(ImageAssets.soldier));

    constructor() {
        super();
        this.init();
    }

    public init() {
        this.soldierSprite.scale.x = Settings.soldierScale;
        this.soldierSprite.scale.y = Settings.soldierScale;
        this.addChild(this.soldierSprite);
    }
}
import * as PIXI from "pixi.js";
import {Settings} from "../Settings";
import {PointView} from "../point/PointView";
import {ImageAssets} from "../resources";

export class AreaView extends PIXI.Container {

    public areaSprite: PIXI.Sprite;
    public areaId: number;
    public pointView: PointView;

    constructor(sprite: PIXI.Sprite, areaId: number) {
        super();
        this.areaSprite = sprite;
        this.areaId = areaId;
        const pointSprite = new PIXI.Sprite(PIXI.Texture.from(ImageAssets.point));
        this.pointView = new PointView(pointSprite, this.areaId);
        this.init(true);
    }

    public init(addPoint: boolean = false) {
        this.addChild(this.areaSprite);
        if (addPoint) {
            this.areaSprite.addChild(this.pointView);
        }
        this.position.x = Settings.areas[this.areaId].position.x;
        this.position.y = Settings.areas[this.areaId].position.y;
    }

    public setPlayerGot(): void {
        this.areaSprite.tint = 0xcc00FF;
        this.pointView.pointSprite.tint = 0xcc00FF;
    }

    public setAIGot(): void {
        this.areaSprite.tint = 0xFFcc00;
        this.pointView.pointSprite.tint = 0xFFcc00;
    }
}
import * as PIXI from "pixi.js";
import {Settings} from "../Settings";
import {SoldierView} from "./SoldierView";
import {GameEvents} from "../GameEvents";
import gsap from "gsap";

export class SoldiersView extends PIXI.Container {

    public pointAttack?: PIXI.Point;
    public pointAttacked?: PIXI.Point;
    public durationAttacked?: number;

    constructor() {
        super();
    }

    public init(pointAttack: PIXI.Point, pointAttacked: PIXI.Point, duration: number) {
        this.pointAttack = pointAttack;
        this.pointAttacked = pointAttacked;
        this.durationAttacked = duration;
    }

    public addSoldiers(lastSoldier: boolean) {
        if (this.pointAttack && this.pointAttacked) {
            const soldier: SoldierView = new SoldierView();
            soldier.x = this.pointAttack.x
            soldier.y = this.pointAttack.y;
            this.addChild(soldier);
            gsap.fromTo(soldier.position,
                {x: this.pointAttack.x, y: this.pointAttack.y},
                {x: this.pointAttacked.x, y: this.pointAttacked.y, duration: this.durationAttacked, ease: "linear"}).then(() => {
                    this.emit(GameEvents.SOLDIER_FIGHT_ENEMY);
                    this.removeChild(soldier);
                    if (lastSoldier) {
                        this.emit(GameEvents.SOLDIERS_ENDED);
                    }
            });
        }
    }
}
import * as PIXI from "pixi.js";

export interface ISoldierAttackData {
    soldiersAmount: number,
    pointAttack: PIXI.Point,
    pointAttacked: PIXI.Point,
    attackAreas: number,
    targetPlayerAttack: number
}

export interface ISoldierFightData {
    targetPlayerAttack: number,
    isAI: boolean
}
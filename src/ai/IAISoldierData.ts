import * as PIXI from "pixi.js";

export interface IAISoldierData {
    index: number,
    soldierAmount: number,
    isEnemy: boolean
}

export interface IAIAttackData {
    attackArea: number,
    targetAttack: number
}
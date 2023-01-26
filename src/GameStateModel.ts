import { Settings } from './Settings';

export class GameStateModel {

    private _isGameStarted: boolean = false;
    private _playerAreas: number[] = [];
    private _aiAreas: number[] = [];
    private _attackAreas: number[] = [];
    private _readyActive: boolean = false;
    private _arrowsActivated: boolean = false;
    private _targetPlayerAttack: number = -1;
    private _targetPlayerMove: number = -1;

    constructor() { }

    public init() {
        this._isGameStarted = false;
        this._playerAreas = [];
        this._aiAreas = [];
    }

    get isGameStarted(): boolean {
        return this._isGameStarted;
    }

    get playerAreas(): number[] {
        return this._playerAreas;
    }

    get aiAreas(): number[] {
        return this._aiAreas;
    }

    get attackAreas(): number[] {
        return this._attackAreas;
    }

    get targetPlayerAttack(): number {
        return this._targetPlayerAttack;
    }

    get targetPlayerMove(): number {
        return this._targetPlayerMove;
    }

    get arrowsActivated(): boolean {
        return this._arrowsActivated;
    }

    set isGameStarted(value: boolean) {
        this._isGameStarted = value;
    }

    set playerAreas(playerAreas: number[]) {
        this._playerAreas = playerAreas;
    }

    set aiAreas(aiAreas: number[]) {
        this._aiAreas = aiAreas;
    }

    get readyActive(): boolean {
        return this._readyActive;
    }

    set readyActive(value: boolean) {
        this._readyActive = value;
    }

    set attackAreas(value: number[]) {
        this._attackAreas = value;
    }

    set targetPlayerAttack(value: number) {
        this._targetPlayerAttack = value;
    }

    set targetPlayerMove(value: number) {
        this._targetPlayerMove = value;
    }

    set arrowsActivated(value: boolean) {
        this._arrowsActivated = value;
    }
}

const gameSateModel = new GameStateModel();
export { gameSateModel };


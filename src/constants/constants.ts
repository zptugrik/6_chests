import * as PIXI from "pixi.js";

/**
 * Scene state enum, representing its lifecycle.
 */
export enum SceneState {
    LOAD,
    PROCESS,
    FINALIZE,
    DONE
}

/**
 * Base interface for all game scenes.
 */
export interface GameScene {
    sceneUpdate(delta: number): void;
}

export enum TransitionType {
    FADE_OUT = "hide_mask",
    FADE_IN = "show_mask"
}

/**
 * Base interface for a scene transition.
 *
 * @export
 * @interface SceneTransition
 */
export interface SceneTransition {
    /**
     * Initializes the transition, can be called multiple times.
     * @param app 
     * @param type 
     * @param sceneContainer 
     */
    init(sceneContainer: PIXI.Container, type: TransitionType): void;
    update(delta: number, callback: () => void): void;
}


export interface Position {
    x: number;
    y: number;
};

export interface Size {
    width: number;
    height: number;
}

export interface ChestModel {
    position: Position;
    size: Size;
    index: number;
    activated: boolean;
};

export enum BUTTON_STATE {
    ENABLE,
    DISABLE,
    HOVER
}

export interface Result {
    chestWin: number;
    chestBonusWin: number;
    chestTotalWin: number;
    totalWin: number;
}

const BUTTON_PLAY_STYLE_ENABLE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#c0c0c0' ],
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
});

const BUTTON_PLAY_STYLE_DISABLE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#c0c0c0'],
    stroke: '#000000',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
});

const BUTTON_PLAY_STYLE_HOVER = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#909090' ],
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
});

const CONSTANTS = {
    NUM_CHESTS: 6,
    CHEST_HEIGHT: 100,
    CHEST_WIDTH: 850,

    LOCALS: {
        en: {
            PLAY: 'Play!',
            CHEST: 'Chest',
            WIN_AMOUNT: 'Bonus Win Amount',
            WIN_BONUS: 'You Win bonus animation',
            BONUS_WIN: 'Bonus Win',
            BONUS_TITLE: 'Bonus Screen'
        }
    },

    DEFAULT_LANGAUGE: 'en',

    BUTTON_PLAY_STYLE_ENABLE: BUTTON_PLAY_STYLE_ENABLE,
    BUTTON_PLAY_STYLE_DISABLE: BUTTON_PLAY_STYLE_DISABLE,
    BUTTON_PLAY_STYLE_HOVER: BUTTON_PLAY_STYLE_HOVER
};

export default CONSTANTS;

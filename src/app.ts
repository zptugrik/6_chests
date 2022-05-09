import * as PIXI from "pixi.js";
import { MainScene } from "./scenes/mainScene";
import { BonusScene } from "./scenes/bonusScene";
import { Engine } from "./engine/engine";
import { SimpleFadeTransition } from "./transition/transition";
import { TransitionType } from "./constants/constants";

const TRANSITION_STEP = 0.03;

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true
});

app.stage.interactive = true;

document.body.appendChild(app.view);

const mainScene = new MainScene(app);
const bonusScene = new BonusScene(app);

const setup = (): void => {
    const engine: Engine = new Engine(app, [
        {
            index: 0,
            name: "mainScene",
            gameScene: mainScene,
            fadeInTransition: new SimpleFadeTransition(app, TRANSITION_STEP, TransitionType.FADE_IN),
            fadeOutTransition: new SimpleFadeTransition(app, TRANSITION_STEP, TransitionType.FADE_OUT)
        },
        {
            index: 1,
            name: "bonusScene",
            gameScene: bonusScene,
            fadeInTransition: new SimpleFadeTransition(app, TRANSITION_STEP, TransitionType.FADE_IN),
            fadeOutTransition: new SimpleFadeTransition(app, TRANSITION_STEP, TransitionType.FADE_OUT)
        } ]);

    app.ticker.add(delta => {
        engine.update(delta);
    });
}

window.onload = setup;


// Autoresize for canvas
const ratio = window.innerWidth / window.innerHeight;

const resize = () => {
    let w = window.innerHeight;
    let h = window.innerHeight;
    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
    } else {
        h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
}
resize();
window.onresize = resize;

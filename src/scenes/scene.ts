import { GameScene, SceneState, SceneTransition, TransitionType } from "../constants/constants";
import * as PIXI from "pixi.js";
import { SimpleFadeTransition } from '../transition/transition';


/**
 * Base implementation of a scene. Provides lifecycle update logic.
 *
 * @export
 * @abstract
 * @class AbstractGameScene
 * @implements {GameScene}
 */
export abstract class AbstractGameScene implements GameScene {
    protected sceneState: SceneState;
    protected app: PIXI.Application;
    protected sceneSwitcher: (sceneName: string) => void;
    protected fadeInSceneTransition: SceneTransition;
    protected fadeOutSceneTransition: SceneTransition;
    protected sceneContainer: PIXI.Container;
    private onDone: () => void;

    constructor(app: PIXI.Application) {
        this.sceneState = SceneState.LOAD;
        this.app = app;
        this.sceneSwitcher = (sceneName: string) => { };
        this.fadeInSceneTransition = new SimpleFadeTransition(app, 0.1, TransitionType.FADE_IN);
        this.fadeOutSceneTransition = new SimpleFadeTransition(app, 0.1, TransitionType.FADE_OUT);
        this.sceneContainer = new PIXI.Container();
        this.onDone = () => { };
    }

    set fadeInTransition(fadeInSceneTransition: SceneTransition) {
        this.fadeInSceneTransition = fadeInSceneTransition;
    }

    set fadeOutTransition(fadeOutSceneTransition: SceneTransition) {
        this.fadeOutSceneTransition = fadeOutSceneTransition;
    }

    /**
     * Basic initialization of a scene, passing in the PIXI.APP
     * @param app 
     */
    init(app: PIXI.Application, sceneSwitcher: (sceneName: string) => void): void {
        this.app = app;
        this.sceneSwitcher = sceneSwitcher;
    }

    getSceneContainer() {
        return this.sceneContainer;
    }

    /**
     * Setup the scene for usage.
     * @param sceneContainer 
     */
    abstract setup(sceneContainer: PIXI.Container): void;

    /**
     * Handler that is called before the transition has completed.
     * To be used when some motion is necessary before the full scene update has started.
     * @param delta 
     */
    abstract preTransitionUpdate(delta: number): void;

    /**
     * Core scene update loop.
     * @param delta 
     */
    abstract sceneUpdate(delta: number): void;

    /**
     * Scene lifecycle update loop.
     * @param delta 
     */
    update(delta: number): void {
        switch (this.sceneState) {
            case SceneState.LOAD:
                this.fadeInSceneTransition.update(delta, () => {
                    this.sceneState = SceneState.PROCESS;
                });
                this.preTransitionUpdate(delta);
                break;
            case SceneState.PROCESS:
                this.sceneUpdate(delta);
                break;
            case SceneState.FINALIZE:
                this.fadeOutSceneTransition.update(delta, () => {
                    this.sceneState = SceneState.LOAD;
                    if (this.onDone) {
                        this.onDone();
                    }
                });
                break;
        }
    }

    refresh(): void {

    }

    setFinalizing(onDone: () => void) {
        this.onDone = onDone;
        this.sceneState = SceneState.FINALIZE;
    }
}
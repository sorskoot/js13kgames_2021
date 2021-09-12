/// <reference path="../../typings/playcanvas.d.ts" />

//import { LevelController } from "./levelcontroller";

const movementSpeed = 1.5; // 1.5 m/s
const rotateSpeed = 45;
const rotateThreshold = 0.5;
const rotateResetThreshold = 0.25;

const tmpVec2A = new pc.Vec2();
const tmpVec2B = new pc.Vec2();
const tmpVec3A = new pc.Vec3();
const tmpVec3B = new pc.Vec3();
const lineColor = new pc.Color(1, 1, 1);

var GameController = pc.createScript('game');

GameController.prototype.initialize = function () {

    this.app.game = this;

    this.controllers = [];
    this.lastRotateValue = 0;
    this.inVR = false;
    this.app.root.addComponent('script');
    this.app.root.script.create('shapeWorld');
    this.app.root.script.create('spacetexture');
    // create camera parent
    this.cameraParent = new pc.Entity();
    this.cameraParent.addComponent('script');
    this.cameraParent.script.create('teleportCamera');
    this.cameraParent.script.create('rotateCamera');
    this.gameState = 'start';
    // create camera
    this.camera = new pc.Entity();
    this.camera.addComponent('camera', {
        clearColor: pc.Color.BLACK,
        farClip: 1000
    });
    this.camera.addComponent('script');
    this.camera.script.create('blackness');

    this.camera.translate(0, 1.6, 0);

    this.textgroup = new pc.Entity();
    this.titleImage = new pc.Entity();
    this.titleImage.addComponent('render', {
        type: 'plane'
    });
    this.titleImage.translate(0, 1.8, -2);
    this.titleImage.rotateLocal(90, 0, 0);
    this.titleImage.setLocalScale(3.2, .8, .8);
    this.titleImage.addComponent('script');
    this.titleImage.script.create('titleText',);
    this.textgroup.addChild(this.titleImage);
    this.buttons = new pc.Entity();
    this.restartButton = this.createButton('Restart', .5, 1.4, -1.5, 0.6, .25);
    this.restartButton.on('button:click', this.restart, this);
    this.restartButton.enabled = false;
    this.buttons.addChild(this.restartButton);

    this.continueButton = this.createButton('Continue', -.5, 1.4, -1.5, 0.6, .25);
    this.continueButton.on('button:click', () => {
        sound.play(3);
        this.gameStateChange('play', 'continue');
    })
    this.continueButton.enabled = false;
    this.buttons.addChild(this.continueButton);

    this.playButton = this.createButton('Play', 0, 1.4, -1.5, 0.6, .25);
    this.playButton.on('button:click', this.play, this)
    this.playButton.enabled = true;
    this.buttons.enabled = false;
    this.buttons.addChild(this.playButton);
    this.textgroup.addChild(this.buttons);

    this.app.root.addChild(this.textgroup);
    this.app.scene.ambientLight = new pc.Color(1, 1, 1);
    this.locator = new pc.Entity();
    this.locator.addComponent('render', {
        type: "cylinder"
    });

    let locatorMat = new pc.StandardMaterial();
    locatorMat.emissive = new pc.Color(0.3, 0.56, 0.51);
    this.locator.setLocalScale(.125, .01, .125);
    this.locator.render.material = locatorMat;

    this.locator.addComponent('script');
    this.locator.script.create('teleport');
    this.app.root.addChild(this.locator);

    let controller = new pc.Entity();

    controller.enabled = false;
    controller.addComponent('script');
    controller.script.create('controller');
    this.desktopPointer = new pc.Entity();
    this.desktopPointer.addComponent('render', {
        type: 'box'
    });
    this.desktopPointer.enabled = false;

    const pointerMaterial = new pc.StandardMaterial();
    pointerMaterial.diffuse = new pc.Color(0.98, 0.98, 0.76);
    pointerMaterial.depthTest = false;
    pointerMaterial.depthWrite = false;
    pointerMaterial.blendType = pc.BLEND_NORMAL;
    pointerMaterial.update();
    this.desktopPointer.setLocalScale(.005, .005, .005);
    this.desktopPointer.setPosition(0, 0, -1);
    this.desktopPointer.render.material = pointerMaterial;
    this.camera.addChild(this.desktopPointer);


    this.app.root.script.create('controllers', {
        attributes: {
            controllerTemplate: controller
        }
    });


    this.camera.addComponent('script');
    this.camera.script.create('lookCamera', {
        attributes: {
            controllerTemplate: controller
        }
    });

    this.cameraParent.addChild(this.camera);
    // Add the new entities to the hierarchy
    this.app.root.addChild(this.cameraParent);
    // update position and rotation for each controller
    this.app.on('update', this.update, this);

    const levelController = new pc.Entity();
    levelController.addComponent('script');
    levelController.script.create('levelController');
    this.app.root.addChild(levelController);

    this.app.xr.on('start', () => {
        this.buttons.enabled = true;
    });

    this.app.xr.on('end', () => {
        this.buttons.enabled = false;
    });

    this.on('button4:pressed', () => {
        if (this.gameState == 'play') {
            this.gameStateChange('pause');
        }
    }, this);

    this.app.on('game:done', () => {
        console.log("game done");
        this.gameStateChange('start');

    }, this);

    this.gameStateChange('start');
}

GameController.prototype.startXR = function () {
    InitAudio();
    this.camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
        callback: (err) => {
            if (err) {
                console.error("WebXR Immersive VR failed to start: " + err.message);
                this.inVR = false;
            } else {
                this.inVR = true;
            }
        }
    });

}
GameController.prototype.endXR = function () {
    this.camera.camera.endXr();
    this.desktopPointer.enabled = true;
    this.inVR = false;
}

GameController.prototype.createButton = function (text, x, y, z, scalex, scaley) {
    const button = new pc.Entity();
    button.addComponent('render', {
        type: 'plane'
    });
    button.translate(x, y, z);
    button.rotateLocal(90, 0, 0);
    button.setLocalScale(scalex, scaley, scaley);

    button.addComponent('script');
    button.script.create('button', {
        attributes: {
            text: text
        }
    });
    return button;
}

GameController.prototype.gameStateChange = async function (state, extraData) {
    switch (state) {
        case 'start':
            this.resetCameraForTitle();
            this.playButton.enabled = true;
            this.restartButton.enabled = false;
            this.continueButton.enabled = false;
            this.textgroup.enabled = true;
            await this.app.mainCamera.script.blackness.fadeIn()
            break;
        case 'play':
            this.textgroup.enabled = false;
            await this.app.mainCamera.script.blackness.fadeOut()
            if (this.gameState != 'start' && extraData == 'continue') {
                this.app.levelController.unpause();
            }
            else {
                this.app.levelController.start(this.app.levelController.cl);
            }
            break;
        case 'pause':
            await this.app.levelController.pause();
            this.resetCameraForTitle();
            this.playButton.enabled = false;
            this.restartButton.enabled = true;
            this.continueButton.enabled = true;
            this.textgroup.enabled = true;
            await this.app.mainCamera.script.blackness.fadeIn()
            break;

    };
    this.gameState = state;
    this.app.fire('game:stateChange', state, this);
}
GameController.prototype.resetCameraForTitle = function () {
    var pos = this.cameraParent.getPosition();
    this.textgroup.setPosition(pos.x, 0, pos.z);
    if (this.app.xr.active) {               
        var rot = this.app.mainCamera.getRotation();
        this.textgroup.setRotation(rot);
        this.textgroup.lookAt(this.app.mainCamera);                
    }else{
        this.camera.script.lookCamera.enabled=false
        this.camera.setLocalRotation(0,0,0,1)
        this.cameraParent.setLocalRotation(0,0,0,1);
    }
}
GameController.prototype.play = function () {
    InitAudio();
    sound.play(3);
    if (this.gameState == 'start')
        this.gameStateChange('play');
    else
        this.gameStateChange('play', 'continue');
}

GameController.prototype.restart = function () {
    sound.play(3);
    this.gameStateChange('play', 'restart');
}
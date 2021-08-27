import { LevelController } from "./levelcontroller";

const movementSpeed = 1.5; // 1.5 m/s
const rotateSpeed = 45;
const rotateThreshold = 0.5;
const rotateResetThreshold = 0.25;

const tmpVec2A = new pc.Vec2();
const tmpVec2B = new pc.Vec2();
const tmpVec3A = new pc.Vec3();
const tmpVec3B = new pc.Vec3();
const lineColor = new pc.Color(1, 1, 1);

export class Game {
    /**
     * 
     * @param {pc.Application} app 
     * @param {pc.Asset} tilesTexture 
     * @param {pc.Shader} shader 
     */
    constructor(app, tilesTexture, shader) {
        this.app = app;
        this.tilesTexture = tilesTexture;
        this.shader = shader;

        this.controllers = [];
        this.lastRotateValue = 0;
        
        this.levelController = new LevelController(this.app, this.tilesTexture, this.shader);
    }

    async init() {
        await import('./pcUtils');
        await import('./controller');
        await import('./teleportCamera');
        await import('./lookCamera');
        await import('./locator');
        await import('./shapeWorld');
        await import('./shape');

        this.app.root.addComponent('script');
        this.app.root.script.create('shapeWorld');
        
        // create camera parent
        this.cameraParent = new pc.Entity();
        this.cameraParent.addComponent('script');
        this.cameraParent.script.create('teleportCamera');

        // create camera
        this.camera = new pc.Entity();
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(44 / 255, 62 / 255, 80 / 255),
            farClip: 1000
        });
        this.locator = new pc.Entity();
        this.locator.addComponent('render', {
            type: "sphere"        
        });        
        
        this.locator.setLocalScale(.3,.3,.3);
        this.locator.addComponent('script');
        this.locator.script.create('teleport');
        this.app.root.addChild(this.locator);
        
        let controller = new pc.Entity();
        // controller.addComponent('render', {
        //     type: "sphere"
        // });
        controller.enabled = false;
        controller.addComponent('script');
        controller.script.create('controller',{
            attributes:{
                modelEntity: this.locator
            }
        });

        this.camera.addComponent('script');
        this.camera.script.create('lookCamera', {
            attributes: {
                controllerTemplate: controller
            }
        });

        this.cameraParent.addChild(this.camera);
        this.camera.translate(0, 1.6, 0);

       

        // const light = new pc.Entity();
        // light.addComponent("light", {
        //     type: pc.LIGHTTYPE_DIRECTIONAL,
        //     range: 30
        // });
        // light.translate(1, 2, -2);
        // light.rotate(90, 45, 0);

        //const levelcontroller = new LevelController(app);



        // Add the new entities to the hierarchy
        this.app.root.addChild(this.cameraParent);
        //this.app.root.addChild(light);
        //this.app.root.addChild(group);
        // update position and rotation for each controller
        this.app.on('update', this.update, this);

        let startPosition = this.levelController.init();

        this.cameraParent.translate(startPosition.x, startPosition.y, startPosition.z);

    }

    update(dt) {
        this.handleControllers(dt);
    }

    handleControllers(dt) {
        let i, inputSource;
        // first we update movement
        for (i = 0; i < this.controllers.length; i++) {
            inputSource = this.controllers[i].inputSource;
            // should have gamepad
            if (!inputSource.gamepad)
                continue;

            // left controller - for movement
            if (inputSource.handedness === pc.XRHAND_LEFT) {
                // set vector based on gamepad thumbstick axes values
                tmpVec2A.set(inputSource.gamepad.axes[2], inputSource.gamepad.axes[3]);

                // if there is input
                if (tmpVec2A.length()) {
                    tmpVec2A.normalize();

                    // we need to take in account camera facing
                    // so we figure out Yaw of camera
                    tmpVec2B.x = this.camera.forward.x;
                    tmpVec2B.y = this.camera.forward.z;
                    tmpVec2B.normalize();

                    const rad = Math.atan2(tmpVec2B.x, tmpVec2B.y) - (Math.PI / 2);
                    // and rotate our movement vector based on camera yaw
                    const t = tmpVec2A.x * Math.sin(rad) - tmpVec2A.y * Math.cos(rad);
                    tmpVec2A.y = tmpVec2A.y * Math.sin(rad) + tmpVec2A.x * Math.cos(rad);
                    tmpVec2A.x = t;

                    // set movement speed
                    // @ts-ignore engine-tsd
                    tmpVec2A.scale(movementSpeed * dt);
                    // move camera parent based on calculated movement vector
                    this.cameraParent.translate(tmpVec2A.x, 0, tmpVec2A.y);
                }

                // right controller - for rotation
            } else if (inputSource.handedness === pc.XRHAND_RIGHT) {
                // get rotation from thumbsitck
                const rotate = -inputSource.gamepad.axes[2];

                // each rotate should be done by moving thumbstick to the side enough
                // then thumbstick should be moved back close to neutral position
                // before it can be used again to rotate
                if (this.lastRotateValue > 0 && rotate < rotateResetThreshold) {
                    this.lastRotateValue = 0;
                } else if (this.lastRotateValue < 0 && rotate > -rotateResetThreshold) {
                    this.lastRotateValue = 0;
                }

                // if thumbstick is reset and moved enough to the side
                if (this.lastRotateValue === 0 && Math.abs(rotate) > rotateThreshold) {
                    this.lastRotateValue = Math.sign(rotate);

                    // we want to rotate relative to camera position
                    tmpVec3A.copy(this.camera.getLocalPosition());
                    this.cameraParent.translateLocal(tmpVec3A);
                    this.cameraParent.rotateLocal(0, Math.sign(rotate) * rotateSpeed, 0);
                    // @ts-ignore engine-tsd
                    this.cameraParent.translateLocal(tmpVec3A.scale(-1));
                }
            }
        }

        // after movement and rotation is done
        // we update/render controllers
        for (i = 0; i < this.controllers.length; i++) {
            inputSource = this.controllers[i].inputSource;

            // render controller ray
            //tmpVec3A.copy(inputSource.getOrigin());
            //tmpVec3B.copy(inputSource.getDirection());
            // @ts-ignore engine-tsd
            //tmpVec3B.scale(100).add(tmpVec3A);
            //this.app.renderLine(tmpVec3A, tmpVec3B, lineColor);

            // render controller
            if (inputSource.grip) {
                // some controllers can be gripped
                this.controllers[i].model.enabled = true;
                this.controllers[i].setLocalPosition(inputSource.getLocalPosition);
                this.controllers[i].setLocalRotation(inputSource.getLocalRotation);
            } else {
                // some controllers cannot be gripped
                this.controllers[i].model.enabled = false;
            }
        }
    }
    startXR() {
        this.camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
            callback: function (err) {
                //  app.xr._baseLayer.stencil = true;
                if (err) console.error("WebXR Immersive VR failed to start: " + err.message);
            }
        });
    }
    endXR() {
        this.camera.camera.endXr();
    }

    /**
     * 
     * @param {pc.XrInputSource} inputSource 
     */
    createController(inputSource) {
        const entity = new pc.Entity();
        entity.addComponent('model', {
            type: 'box'
        });
        entity.setLocalScale(0.05, 0.05, 0.05);
        this.cameraParent.addChild(entity);
        // @ts-ignore engine-tsd
        entity.inputSource = inputSource;
        this.controllers.push(entity);

        // destroy input source related entity
        // when input source is removed
        inputSource.on('remove', () => {
            this.controllers.splice(this.controllers.indexOf(entity), 1);
            entity.destroy();
        });
    };
}
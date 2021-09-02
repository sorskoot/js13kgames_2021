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

class Game {
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

        this.app.levelController = new LevelController(this.app, this.tilesTexture, this.shader);
    }

    async init() {
        // await import('./pcUtils');
        // await import('./controllers');
        // await import('./controller');
        // await import('./teleportCamera');
        // await import('./lookCamera');
        // await import('./locator');
        // await import('./shapeWorld');
        // await import('./shape');
        // await import('./boxController');

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
        this.camera.translate(0, 1.6, 0);
        
        this.locator = new pc.Entity();
        this.locator.addComponent('render', {
            type: "cylinder"
        });
        let locatorMat = new pc.StandardMaterial();
        locatorMat.emissive = new pc.Color(0.3, 0.56, 0.51);
        this.locator.setLocalScale(.125, .01,.125);
        this.locator.render.material = locatorMat;
        
        this.locator.addComponent('script');
        this.locator.script.create('teleport');
        this.app.root.addChild(this.locator);

        let controller = new pc.Entity();
  
        controller.enabled = false;
        controller.addComponent('script');
        controller.script.create('controller', {
            attributes: {
                modelEntity: this.locator
            }
        });

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

        this.app.levelController.init();

    
        
    }


    startXR() {
        console.log(`before start:${this.camera.getPosition()}`);
        this.camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {            
            callback: (err) => {
                console.log(`in callback:${this.camera.getPosition()}`);
                //  app.xr._baseLayer.stencil = true;
                if (err) console.error("WebXR Immersive VR failed to start: " + err.message);
            }
        });
        //this.camera.translate(0,0.7,0);
        console.log(`after start:${this.camera.getPosition()}`);
    }
    endXR() {        
        console.log(`before end:${this.camera.getPosition()}`);
        this.camera.camera.endXr((err)=>{
            console.log(`in exit callback:${this.camera.getPosition()}`);
        });
        
        console.log(`after end:${this.camera.getPosition()}`);
    }
}
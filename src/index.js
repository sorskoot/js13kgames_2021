import { LevelController } from "./classes/levelcontroller";
import outsidePortal from "./scripts/outsidePortal";
import insidePortal from "./scripts/insidePortal";
import portalScript from "./scripts/portal";

(async function () {

    await import('./scripts/rotator.js');
  
    
    const tilesTexture = new pc.Asset("tiles","texture",{
        url:'./Tiles.png',    
    });
    
    
    // create a PlayCanvas application
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas, {
        mouse: new pc.Mouse(canvas),
        touch: new pc.TouchDevice(canvas),
        keyboard: new pc.Keyboard(window),
    });
    app.graphicsDevice.setStencilTest(true);
    app.assets.add(tilesTexture);
    app.assets.load(tilesTexture);
    
    /** Shader **/
    const vertShader = await import('./shaders/vertShader.glsl');
    const fragShader = await import('./shaders/fragShader.glsl');
    
    let shaderDefinition = {
        attributes: {
            aPosition: pc.gfx.SEMANTIC_POSITION,
            vertex_texCoord0 : pc.gfx.SEMANTIC_TEXCOORD0
        },
        vshader: vertShader.default,
        fshader: fragShader.default
    };
    let shader = new pc.Shader(app.graphicsDevice, shaderDefinition);

    
    const portalVertShader = await import('./shaders/portalVertShader.glsl');
    const portalFragShader = await import('./shaders/portalFragShader.glsl');
    let portalShaderDefinition = {
        attributes: {
            aPosition: pc.gfx.SEMANTIC_POSITION
        },
        vshader: portalVertShader.default,
        fshader: portalFragShader.default
    };
    let portalShader = new pc.Shader(app.graphicsDevice, portalShaderDefinition);

    const message = function (msg) {
        console.log(msg);
    };
    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // ensure canvas is resized when window changes size
    window.addEventListener('resize', () => app.resizeCanvas());

    // create camera
    // create camera parent
    const cameraParent = new pc.Entity();

 // Create a 512x512x24-bit render target with a depth buffer
 var colorBuffer = new pc.Texture(app.graphicsDevice, {
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_R8_G8_B8
});
var renderTarget = new pc.RenderTarget({
    colorBuffer: colorBuffer,
    depth: true
});
let camera2 = new pc.Entity();
camera2.addComponent('camera', {
});
/** @type {pc.CameraComponent} */
var cameraComponent = camera2.camera;
cameraComponent.renderTarget = renderTarget;
cameraComponent.clearColor = new pc.Color(1, 0, 0, 1);
camera2.setLocalPosition(0, 10, 4);


    // create camera
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(44 / 255, 62 / 255, 80 / 255),
        farClip: 10000
    });
    cameraParent.addChild(camera);

    camera.translate(0, 0, 50);
   

    const light = new pc.Entity();
    light.addComponent("light", {
        type: pc.LIGHTTYPE_DIRECTIONAL,
        range: 30
    });
    light.translate(1, 2, -2);
    light.rotate(90, 45, 0);



    //const levelcontroller = new LevelController(app);

    //     const Rotator = pc.createScript('rotator');

    // let t = 0;

    // Rotator.prototype.update = function (dt) {
    //     t += dt;
    //     this.entity.setEulerAngles(0, Math.sin(t) * 20, 0);
    // };

    const insideMat = new pc.StandardMaterial();
    const outsideMat = new pc.StandardMaterial();
    

    const borderMat = new pc.Material();

    tilesTexture.ready(()=>{
        tilesTexture.resource.magFilter = 
        tilesTexture.resource.minFilter = pc.FILTER_NEAREST

        borderMat.setShader(shader);         
        let tileIndex = 1;
        // Set the diffuse texture      
        borderMat.setParameter('index',tileIndex);
        borderMat.setParameter('DiffuseTexture', tilesTexture.resource);
        //this.material.setParameter('Lookup', textureLookup);
        //this.material.setParameter('lookupIndex',lookupIndex);
        //this.material.setParameter('lookupShift', 0.0);
        borderMat.setParameter('spriteDimensions', [16.0,1.0]);
        borderMat.setParameter('repeat', [3, 3]);
        //this.material.setParameter('color: ',new THREE.Color(color) },
        //this.material.setParameter('tint: { value: new THREE.Color(255, 255, 255) },
        //this.material.setParameter('tintAmount: { value: 0 }

        // borderMat.diffuseMap = tilesTexture.resource;
        
        //borderMat.diffuseMapOffset.set(offsetu, offsetv);        
        borderMat.update();
    });
    

    // Create a root for the graphical scene
    const group = new pc.Entity();
    // group.addComponent('script');
    // group.script.create(rotator().scriptName);

    // Create a Entity with a Box model component
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    box.model.material = insideMat;
    box.addComponent('particlesystem', {
        numParticles: 128,
        lifetime: 5,
        rate: 0.1,
        rate2: 0.1,
        emitterShape: pc.EMITTERSHAPE_BOX,
        emitterExtents: new pc.Vec3(0, 0, 0),
        scaleGraph: new pc.Curve([0, 0.1]),
        velocityGraph: new pc.CurveSet([[0, 3], [0, 3], [0, 3]]),
        velocityGraph2: new pc.CurveSet([[0, -3], [0, -3], [0, -3]])
    });
    // box.addComponent('script');
    // box.script.create(insidePortal().scriptName);
    box.setLocalPosition(0, 0.5, -1.936);


   
    // Create the portal entity
    const portal = new pc.Entity();
    portal.addComponent('model', {
        type: 'plane'
    });
    // portalMat.diffuseMap = new pc.Texture(app.graphicsDevice, {
    //     width: 512,
    //     height: 512,
    //     format: pc.PIXELFORMAT_R8_G8_B8,
    //     SourceBuffer:colorBuffer
    // });
    // //portalMat.diffuseMap.setSource(colorBuffer);
    //portalMat.diffuseMap = renderTarget.colorBuffer;
    const portalMat = new pc.Material();
    portalMat.setShader(portalShader);
    portalMat.setParameter('DiffuseTexture',renderTarget.colorBuffer);
    portalMat.update();
    

    //renderTarget.colorBuffer;
    portal.model.material = portalMat;


    // portal.addComponent('script');
    // portal.script.create(portalScript().scriptName);
    portal.setLocalPosition(0, 0, .1);
    portal.setLocalEulerAngles(90, 0, 0);
    portal.setLocalScale(3, 1, 3);

    // Create the portal border entity
    const border = new pc.Entity();
    border.addComponent('model', {
        type: 'box'        
    });
    border.model.material = borderMat;
    // border.addComponent('script');
    // border.script.create(outsidePortal().scriptName);
    border.setLocalPosition(2, 10, -1.6);
    border.setLocalEulerAngles(90, 0, 0);
    border.setLocalScale(3, 3, 3);
    const border4= new pc.Entity();
    border4.addComponent('model', {
        type: 'box'        
    });
    border4.model.material = borderMat;    
    border4.setLocalPosition(-2, 10, -1.6);
    border4.setLocalEulerAngles(90, 0, 0);
    border4.setLocalScale(3, 3, 3);

    const border2 = new pc.Entity();
    border2.addComponent('model', {
        type: 'box'        
    });
    border2.model.material = borderMat;
    // border.addComponent('script');
    // border.script.create(outsidePortal().scriptName);
    border2.setLocalPosition(2, 0, -1.6);
    border2.setLocalEulerAngles(90, 0, 0);
    border2.setLocalScale(3, 3, 3);
    const border3 = new pc.Entity();
    border3.addComponent('model', {
        type: 'box'        
    });
    border3.model.material = borderMat;    
    border3.setLocalPosition(-2, 0, -1.6);
    border3.setLocalEulerAngles(90, 0, 0);
    border3.setLocalScale(3, 3, 3);
    // Create an entity with a sphere model component
    const sphere = new pc.Entity();
    sphere.addComponent('model', {
        type: 'sphere'
    });
    sphere.model.material = outsideMat;
    // sphere.addComponent('script');
    // sphere.script.create(outsidePortal().scriptName);
    sphere.setLocalPosition(0, 10, -2.414);
    sphere.setLocalEulerAngles(0, 0, 0);
    sphere.setLocalScale(1, 1, 1);

    // Add the new entities to the hierarchy
    app.root.addChild(cameraParent);
    app.root.addChild(light);
    app.root.addChild(group);
    group.addChild(box);
    group.addChild(portal);
    group.addChild(border);
    group.addChild(border2);
    group.addChild(border3);
    group.addChild(border4);
    app.root.addChild(sphere);
    app.root.addChild(camera2);

    let portalTarget = new pc.Entity();
    camera2.enabled = false;
    camera2.addComponent('script');
    camera2.script.create(portalScript().scriptName, {
        attributes: { 
            sceneCamera: camera 
        }
    });
    // camera2.camera.viewMatrix.mul(
    //              portal.getWorldTransform().mul(camera.getLocalTransform()));
    
    app.start();

    const controllers = [];
    // create controller box
    const createController = function (inputSource) {
        const entity = new pc.Entity();
        entity.addComponent('model', {
            type: 'box'
        });
        entity.setLocalScale(0.05, 0.05, 0.05);
        cameraParent.addChild(entity);
        // @ts-ignore engine-tsd
        entity.inputSource = inputSource;
        controllers.push(entity);

        // destroy input source related entity
        // when input source is removed
        inputSource.on('remove', function () {
            controllers.splice(controllers.indexOf(entity), 1);
            entity.destroy();
        });
    };

    if (app.xr.supported) {
        const activate = function () {
            if (app.xr.isAvailable(pc.XRTYPE_VR)) {

                camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCAL, {
                    callback: function (err) {
                        camera2.enabled = true;
                        //  app.xr._baseLayer.stencil = true;
                        if (err) message("WebXR Immersive VR failed to start: " + err.message);
                    }
                });
            } else {
                message("Immersive VR is not available");
            }
        };

        app.mouse.on("mousedown", function () {
            if (!app.xr.active)
                activate();
        });

        if (app.touch) {
            app.touch.on("touchend", function (evt) {
                if (!app.xr.active) {

                    // if not in VR, activate
                    activate();
                } else {
                    // otherwise reset camera
                    camera.camera.endXr();
                }

                evt.event.preventDefault();
                evt.event.stopPropagation();
            });
        }

        // end session by keyboard ESC
        app.keyboard.on('keydown', function (evt) {
            if (evt.key === pc.KEY_ESCAPE && app.xr.active) {
                app.xr.end();
            }
        });

        app.xr.on('start', function () {
            message("Immersive VR session has started");
        });
        app.xr.on('end', function () {
            message("Immersive VR session has ended");
        });
        app.xr.on('available:' + pc.XRTYPE_VR, function (available) {
            message("Immersive VR is " + (available ? 'available' : 'unavailable'));
        });

        if (!app.xr.isAvailable(pc.XRTYPE_VR)) {
            message("Immersive VR is not available");
        }
        app.xr.input.on('add', function (inputSource) {
            createController(inputSource);
        });

        const movementSpeed = 1.5; // 1.5 m/s
        const rotateSpeed = 45;
        const rotateThreshold = 0.5;
        const rotateResetThreshold = 0.25;
        let lastRotateValue = 0;

        const tmpVec2A = new pc.Vec2();
        const tmpVec2B = new pc.Vec2();
        const tmpVec3A = new pc.Vec3();
        const tmpVec3B = new pc.Vec3();
        const lineColor = new pc.Color(1, 1, 1);

        // update position and rotation for each controller
        app.on('update', function (dt) {
            let i, inputSource;

            // first we update movement
            for (i = 0; i < controllers.length; i++) {
                inputSource = controllers[i].inputSource;

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
                        tmpVec2B.x = camera.forward.x;
                        tmpVec2B.y = camera.forward.z;
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
                        cameraParent.translate(tmpVec2A.x, 0, tmpVec2A.y);
                    }

                    // right controller - for rotation
                } else if (inputSource.handedness === pc.XRHAND_RIGHT) {
                    // get rotation from thumbsitck
                    const rotate = -inputSource.gamepad.axes[2];

                    // each rotate should be done by moving thumbstick to the side enough
                    // then thumbstick should be moved back close to neutral position
                    // before it can be used again to rotate
                    if (lastRotateValue > 0 && rotate < rotateResetThreshold) {
                        lastRotateValue = 0;
                    } else if (lastRotateValue < 0 && rotate > -rotateResetThreshold) {
                        lastRotateValue = 0;
                    }

                    // if thumbstick is reset and moved enough to the side
                    if (lastRotateValue === 0 && Math.abs(rotate) > rotateThreshold) {
                        lastRotateValue = Math.sign(rotate);

                        // we want to rotate relative to camera position
                        tmpVec3A.copy(camera.getLocalPosition());
                        cameraParent.translateLocal(tmpVec3A);
                        cameraParent.rotateLocal(0, Math.sign(rotate) * rotateSpeed, 0);
                        // @ts-ignore engine-tsd
                        cameraParent.translateLocal(tmpVec3A.scale(-1));
                    }
                }
            }

            // after movement and rotation is done
            // we update/render controllers
            for (i = 0; i < controllers.length; i++) {
                inputSource = controllers[i].inputSource;

                // render controller ray
                tmpVec3A.copy(inputSource.getOrigin());
                tmpVec3B.copy(inputSource.getDirection());
                // @ts-ignore engine-tsd
                tmpVec3B.scale(100).add(tmpVec3A);
                app.renderLine(tmpVec3A, tmpVec3B, lineColor);

                // render controller
                if (inputSource.grip) {
                    // some controllers can be gripped
                    controllers[i].model.enabled = true;
                    controllers[i].setLocalPosition(inputSource.getLocalPosition);
                    controllers[i].setLocalRotation(inputSource.getLocalRotation);
                } else {
                    // some controllers cannot be gripped
                    controllers[i].model.enabled = false;
                }
            }
        });

    } else {
        message("WebXR is not supported");
    }
})();
import { Game } from "./classes/game";
(async function () {

    // stage 1: loading scripts
    console.log("Loading scripts...");
    await import('./scripts/rotator.js');

    // stage 2: initialize the game    
    function initGame() {
        return new Promise(resolve => {
            const canvas = document.getElementById('application');
            const app = new pc.Application(canvas, {
                mouse: new pc.Mouse(canvas),
                touch: new pc.TouchDevice(canvas),
                keyboard: new pc.Keyboard(window),
            });
            app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
            app.setCanvasResolution(pc.RESOLUTION_AUTO);
            window.addEventListener('resize', () => app.resizeCanvas());
            resolve(app);
        });
    }
    console.log("Initializing game...");
    /** @type {pc.Application} */
    const app = await initGame();

    // stage 3: loading assets
    function loadAssets(app) {
        return new Promise(resolve => {
            const tilesTexture = new pc.Asset("tiles", "texture", {
                url: './Tiles.png',
            });

            tilesTexture.ready(() => {
                resolve(tilesTexture);
            });

            app.assets.add(tilesTexture);
            app.assets.load(tilesTexture);
        });
    };
    console.log("Loading assets...");
    /** @type {pc.Asset} */
    const tilesTexture = await loadAssets(app);

    function loadShader(app) {
        return new Promise(async resolve => {
            const vertShader = await import('./shaders/vertShader.glsl');
            const fragShader = await import('./shaders/fragShader.glsl');

            let shaderDefinition = {
                attributes: {
                    aPosition: pc.gfx.SEMANTIC_POSITION,
                    vertex_texCoord0: pc.gfx.SEMANTIC_TEXCOORD0
                },
                vshader: vertShader.default,
                fshader: fragShader.default
            };            
            let shader = new pc.Shader(app.graphicsDevice, shaderDefinition);
            resolve(shader);
        });
    };
    console.log("Loading shader...");
    /** @type {pc.Shader} */
    const shader = await loadShader(app);

    const game = new Game(app, tilesTexture, shader);
    await game.init();

    app.start();
    
    if (app.xr.supported) {
        const activate = function () {
            if (app.xr.isAvailable(pc.XRTYPE_VR)) {
                game.startXR();

            } else {
                console.log("Immersive VR is not available");
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
                    game.endXR();                    
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
            console.log("Immersive VR session has started");
        });
        app.xr.on('end', function () {
            console.log("Immersive VR session has ended");
        });
        app.xr.on('available:' + pc.XRTYPE_VR, function (available) {
            console.log("Immersive VR is " + (available ? 'available' : 'unavailable'));
        });

        if (!app.xr.isAvailable(pc.XRTYPE_VR)) {
            console.log("Immersive VR is not available");
        }
        app.xr.input.on('add', function (inputSource) {            
            game.createController(inputSource);
        });

    
    } else {
        console.log("WebXR is not supported");
    }
})();
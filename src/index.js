/// <reference path="../typings/playcanvas.d.ts" />

(function () {
    
    console.log("Initializing game...");
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas, {
        mouse: new pc.Mouse(canvas),
        touch: new pc.TouchDevice(canvas),
        keyboard: new pc.Keyboard(window),
    });
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    window.addEventListener('resize', () => app.resizeCanvas());
    const game = new pc.Entity();
    game.addComponent('script');
    game.script.create('game');
    app.root.addChild(game);    



    console.log("Loading assets...");
    const texturemap = "data:image/webp;base64,UklGRsoDAABXRUJQVlA4TL4DAAAv/8ADEAfBNADAJGvuAxqNSuIP7naLblm6/sE2sm0l38ncyYkpALqlFW2A2B0y1xmmAQAmWVtygbxM4hEu5Q5ucHeLrvMfAABnvry5k6MmOpq7+85qrQbQSY7B6N5+ZaOZCdo7fvzQagl2xDNeA+R8B7j5WXRxwNNCBO2Nloa+1i8dvweyVrVLXta7FtuduuLAYaAtSbLcthIoGvKhiKEBcRktx/T/fybOLAe4cd+7I/oPwW0bSZJcMabSWzupY4DqL5QNklnLHmKq71RIpQDmQnk9yqxA+f+LpKiTMFSDPSqQUCstTykQU1MHeZ06W45jg0UXU5CKra/wPxAAcXmQ4AuAAUAbR+VWuTBTx0N6yI9NEXAJSkafVSeLRHsxAytsUEAqV8SwWJZCkKQ/0V3bYHcZsDtNIgbEi9MKAA3qvFzRNw9A9CGX+/WPPFQKYKqUFnxoesyAlSXesy6rPBt9w7JEGzEb4ulDo322FYlZjLfR/iSY/EIAUJIzw5IBDHEMGtZ5N3XSF+iWF3y4vX8MJThIHgTzCSnvM2nG9dnZtm+cLaw8GbHSIWULTfo2Hmkrinbc1AYyNhIWDSoYfFiL6zyYieFjOuC55qenzliJbMWZ6xgG/AxXBpDvaLzDm5uyszPbQq/hOVUKANaTwbYY5FCPrzpvwH8M4VMcSQxJ+mYPtgYSamyILAIYfn5fLysKS9YhSWB8A7yRp9fj6RwhlQWsYnEtAgfJ4UNpyWKDUTw2PIl9MH+8i3G162WglMNNMwLDeFxbM8dxTCj13zdKDKVEJuyAdGSxwQRT1AkTiU0z07TDzS20pHPFuIKCDXZ8xRha6ySAX9gCQ/JzlURqCdgj/XTp5/TEYXpOUN+5XDelr/fRAGAvayPwHcMK7kX2EUwDaV0eAAjxfzpoXOdhRpbmTlbxySFMB8N60yZai2AtqOwlCRZKfK7ANJDW5WogII44MGhc521GX/oBZ0OvfdfPv+Ms5TlpOmzpG9bCNg+rAKjsJIrOdBy9adf1RNEx7KM/7e6d6L13VAyf7EwvHfeOjnt324p6MqpcVoIruB2nSbBIqoBuOYCgk907O8okJjPiiemgM4CG0ZpWwFpIdABggHtGUJxR7FGFxPTeu3/hhJYv5guKuvC0muK8AiAJr466SvJAy0uinjrTewcJUUhBG6c97x1Idlzz964dLK9T/RIU8wXBewhJ6kq6TGCqjro0Rrm2wfwftJ5y+zziPQV7IGKR6XvrHrZVKw+D2PecHd7r87qyhdljnVII";
    const img = new Image(); // SWITCH THESE LINES TO USER WEBP
    //  img.src = texturemap;
    img.src = 'Tiles.webp';
    var texture = new pc.Texture(app.graphicsDevice);
    texture.setSource(img);
    const tilesTexture = new pc.Asset("tiles", "texture");
    tilesTexture.resource = texture;
    tilesTexture.ready = true;
    app.assets.add(tilesTexture);
    const textureMap2 = "data:image/webp;base64,UklGRnAAAABXRUJQVlA4TGMAAAAvBMACEFegGAAQp29eWzeKHDqNPTwUNZKkLCpYGehnRZ1cfClqJIXBBIqwzQ8xBAO9ZP4DAJwvQ1mBym1aj2+uD8JatIj7g4JIcpr0YicTI1GBERABipEQ0f+s7b3s3Zyj8A0A"
    const img2 = new Image(); // SWITCH THESE LINES TO USER WEBP
    //  img2.src = textureMap2;
    img2.src = 'colors.webp';
    var texture2 = new pc.Texture(app.graphicsDevice);
    texture2.setSource(img2);
    const colorsTexture = new pc.Asset("colors", "texture");
    colorsTexture.resource = texture2;
    colorsTexture.ready = true;
    app.assets.add(colorsTexture);
    
    console.log("Loading shader...");
    let shaderDefinition = {
        attributes: {
            aPosition: pc.gfx.SEMANTIC_POSITION,
            vertex_texCoord0: pc.gfx.SEMANTIC_TEXCOORD0,            
        },
        vshader: vertShader,
        fshader: fragShader
    };
    let shader = new pc.Shader(app.graphicsDevice, shaderDefinition);
    let shaderAsset = new pc.Asset('shader', 'shader');
    shaderAsset.resource = shader;
    shaderAsset.ready = true;
    app.assets.add(shaderAsset);

    app.start();

    const enterVRButton = document.getElementById('enter-vr');

    if (app.xr.supported) {
        const activate = function () {
            if (app.xr.isAvailable(pc.XRTYPE_VR)) {
                app.game.startXR();

            } else {
                console.log("Immersive VR is not available");
            }
        };

        enterVRButton.addEventListener('click', () => {
            if (!app.xr.active) {
                activate();
                enterVRButton.style.display = 'none';
            }
        });

        if (app.touch) {
            app.touch.on("touchend", function (evt) {
                if (!app.xr.active) {
                    activate();
                    enterVRButton.style.display = 'none';
                } else {
                    app.game.endXR();
                    enterVRButton.style.display = 'block';
                }
                evt.event.preventDefault();
                evt.event.stopPropagation();
            });
        }

        // end session by keyboard ESC
        app.keyboard.on('keydown', function (evt) {
            app.game.gameStateChange('pause');
            if (evt.key === pc.KEY_ESCAPE && app.xr.active) {
                app.game.endXR();
                app.xr.end();
                enterVRButton.style.display = 'block';
            }
        });

        app.xr.on('end', function () {
            enterVRButton.style.display = 'block';
        });        
    } 
})();
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
    const texturemap = "data:image/webp;base64,UklGRuwDAABXRUJQVlA4TN8DAAAvD8EDEAfBNADAJGvuAxqNSuIP7naLblm6/sE2sm0l38ncyYkpALqlFW2A2B0y1xmmAQAmWVtygbxM4hEu5Q5ucHeLrvMfAABnvry5k6MmOpq7+85qrQbQSY7B6N5+ZaOZCdo7fvzQagl2xDNeA+R8B7j5WXRxwNNCBO2Nloa+1i8dvweyVrVLXta7FtuduuLAYaBl23bcNjJlhQ5k8SmU1Tw3iDL/YQKvgVhr1fe9Ef2HIEly22YOtyWcDHsRFOAnlPHQVcomwTS+0xiYDoC1UF73sipQ/n+CpKgLYRgdjgQgYTR6nVIgxtMAuU9dLfu5w6JnY0ilWGP8D6Ihrg4SfAEwAejjqNw6XJqlwF3CvNO0/FgVAc+BZYxJdWGRaG9WoMEOBaSyIYaz5VxoZuJP/NC2mF03IcYEYkC8uGgA0MDn6QKybLKronc53S5/5K5SAONaPIAk0TjHezgklUcT37Cco41ZDfFyQAMHYh2JWYy32b5kmLyCzLIkZ4glA5jinDT0eTM+47cfZ5uMxgl4d2fjPhVByToazC+kvK+kGTcmR9u+cbSw8mCClQ4pT2Dn/DbvaR1FJ8B4AxkLCYsGDiafVmKfOzMxfCw7PFp9eegKAdTvu11bRtJwEjPhZ7owgHxH5x1e3BI4ObIvfEvPoVIAsB4MtsUgh7p/1fUJ/MMQPsSR5JSUr/bgaxBicftuiAVjAkw/vy+nhsKSdUgSmN8AL+ThdX84RkhlAatYXIvATnJ4V1qyfEIoHpueRD6YP21x+76VsMnlNFHK7qoZgWDet9bFsZ8TSv33jRJDKZEIByAdWT4hgiXqhIVElpVp2WL3PcTNNZSkc8HcQMETsn/FHErvJIBfeAaG5OcuyVQSsEX54cqP5YHd8ligASQZdk6Xp8qX22wAsJX0EfiOYQW3InsIponUlwcAQvyPThr73K3IyrS4993tpOKTU1gOho2WTfYWwVpQOUqSLJT43IFpIvXlPBAQR5yYNPZ5XZGWRwVOpibZ9x7Dd/38O69SHoumw85jw3ra5mEVAJWDRDlYjnO07LqeKAeGfQyUh8V9L0YkMRXTJwfL54HvPQP3hL419WCi8twIrgx2nCbJImkEDIcDCDrZ9+IBm8RiRjyw7IbKio6JVlZgoBwdEBjgniMoTigFwi4xo/eEXzig14v5A0VderqnuK5ABz4GfJXkCS0vSYz4TL/3AAjEv5UppKCP05F7pJbkiOT3yA0k96l+SYr5A+4e5abaSJcNTGPAl8YoW5vM70Hv6YjPLSJ8nx+BGgeZ3su3kGejcTcI2B1s8H+M3Fe2MFus09MQAA==";
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

    app.htmlEnterVRButton = document.getElementById('enter-vr');
    app.htmlPlayButton = document.getElementById('play');    
    app.htmlRestartButton = document.getElementById('restart');
    
    document.addEventListener('pointerlockchange', (e) => {
        if (!document.pointerLockElement) {
            app.game.gameStateChange('pause');
            app.htmlPlayButton.classList.remove('none');
            app.htmlRestartButton.classList.remove('none');
        }
    }, false);

    if (app.xr.supported) {
        const activate = function () {
            if (app.xr.isAvailable(pc.XRTYPE_VR)) {
                app.game.startXR();
            } else {
                console.log("Immersive VR is not available");
            }
        };

        app.htmlEnterVRButton.addEventListener('click', () => {
            if (!app.xr.active) {
                activate();                
                app.htmlRestartButton.classList.add('none');
            }
        });
        app.htmlPlayButton.addEventListener('click', () => {
            app.mouse.enablePointerLock();
            app.htmlEnterVRButton.classList.add('none');
            app.htmlPlayButton.classList.add('none');
            app.htmlRestartButton.classList.add('none');            
            app.game.play();
        });
        app.htmlRestartButton.addEventListener('click', () => {
            app.mouse.enablePointerLock();
            app.htmlEnterVRButton.classList.add('none');
            app.htmlPlayButton.classList.add('none');
            app.htmlRestartButton.classList.add('none');            
            app.game.restart();
        });

        // if (app.touch) {
        //     app.touch.on("touchend", function (evt) {
        //         if (!app.xr.active) {
        //             activate();
        //             enterVRButton.style.display = 'none';
        //         } else {
        //             app.game.endXR();
        //             enterVRButton.style.display = 'block';
        //         }
        //         evt.event.preventDefault();
        //         evt.event.stopPropagation();
        //     });
        // }

        // end session by keyboard ESC
        app.keyboard.on('keydown', function (evt) {
            if (evt.key === pc.KEY_ESCAPE) {                
                if (app.xr.active) {
                    app.game.endXR();
                    app.xr.end();
                    app.htmlEnterVRButton.style.display = 'block';
                }
            }
        });

        app.xr.on('end', function () {
            app.htmlEnterVRButton.style.display = 'block';
        });
    }
})();
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
    const texturemap = "data:image/webp;base64,UklGRu4DAABXRUJQVlA4TOIDAAAvD8EDEAfBNADAJGvuAxqNSuIP7naLblm6/sE2sm0l38ncyYkpALqlFW2A2B0y1xmmAQAmWVtygbxM4hEu5Q5ucHeLrvMfAABnvry5k6MmOpq7+85qrQbQSY7B6N5+ZaOZCdo7fvzQagl2xDNeA+R8B7j5WXRxwNNCBO2Nloa+1i8dvweyVrVLXta7FtuduuLAYaAtSbLcthIoGvKhiKEBcRktx/D/fybOLIe4Efe5O6L/ENy2kSQpFWMqs7XjTnX3HE8o/aGzlF2CaXyn0XE4AOZCeT3KrED5/wmSoi6EYTTYE4CEsdHqlAIxnjrIfepsOY4NFl2MIRXrr/A/iA1xdZDgC4ABQFtH5d7h0rQCDwnzQTvSbYOAS2AZfVJdWCTamxnYYIMCUrkhhsWyFML11r5AV9vpLxgxJhAD4sXFBgANfF6uIMsuuyr6kMv9+kceKgUwrsUDSBIFssR72CWVZxPfsCzRxsyGuB3QwIFYR2Ka8TbaS4bJFWTakpxDLBnAEOegoc+78RnffpxtMlon4MOdG4+hCDSbRMdn0UZ5n0mzrk/OdnzjbGHlyQQrHVKewB7z23ikdSQ+1HgDGQsJiwYOBp9WYp8Hc2D4mA5Yt/q06gwB1O+77S0jaViJGfAzXDWAfEfjHV5cC5yc2Rq/pedUKQBYTwY7YpBDPb7q/AT+YQhXcSQ5JOWbPfE1CLG4fTfEgj7RMvz8vl42FJZk4i728Q3wQp5ej6dzhFQWsIrFjQgcJIcPpSXLJ4TiselJ5IP50xa373sJNrleBpVyuGlGIBiP22jiOI4Jpf77RomhlEiEHZCOLJ8QwRRNwkIi08y0bLH7HuKONZRkcsW4gYIn5PiKMZQ2SQC/8AwMyc+7JFNJwB7l1ZXXacVhWidoAEmGk8v1qfL1PhoA7CVtBb5jWMG9yB6CaSL15QGAEP+ng8Y+DzOyMi3uvrufVHxyCMvBst6yyTYiWAsqe0mShRKfd2CaSH05DwTEEScGjX3eZqTlXoGToUnH557yXT//jlt5nTRdtvQta2mHh1UAVHYSZWc5zt6ym3qi7Fj20VHuFve5GJHEVAyf7CwvHZ97Or4ntK2pJxOVy0bwidKu0yRZJI2A7nAAwST7XNxhk5jMihXToausaJjYyoqOsrvMozLccwTFCaVA2CSm93vCL5zQ6sW8QFGXnuYprivQgI8OXyV5QstLEj0+0889AALxtzKFmH5HO0QPNTkjNP8euYPkPtW3pJgXcN+j3KFupG0D0+jwpTHKbQzm/6DNtMfnHhHe53ugxkGm38v3kGdj42EQsDnY4XeM3FfWmD369DQE";
    const img = new Image(); // SWITCH THESE LINES TO USER WEBP
    img.src = texturemap;
    //img.src = 'Tiles.webp';
    var texture = new pc.Texture(app.graphicsDevice);
    texture.setSource(img);
    const tilesTexture = new pc.Asset("tiles", "texture");
    tilesTexture.resource = texture;
    tilesTexture.ready = true;
    app.assets.add(tilesTexture);
    const textureMap2 = "data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvBMACEF+gKADIyFevu64UOlDk2HqoiSRJOVRw4Umgl/AOXy5GihpJYVCECWzzQwzBQC+Z/wAA+2UoK1C5TY/xzY2jNxX2okU8HhTEtg393RLHKCIFgfYKFBUhov+Zus/N3o1l6KkGfw=="
    const img2 = new Image(); // SWITCH THESE LINES TO USER WEBP
    img2.src = textureMap2;
    //img2.src = 'colors.webp';
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

    document.addEventListener('pointerlockchange', async (e) => {
        if (!document.pointerLockElement) {            

            await app.game.gameStateChange('pause');                      
            app.game.desktopPointer.enabled=false;
            app.htmlPlayButton.classList.remove('none');
            app.htmlRestartButton.classList.remove('none');
        }
    });

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
            app.mouse.enablePointerLock(() => {
                app.mainCamera.script.lookCamera.enabled=true;
                //app.htmlEnterVRButton.classList.add('none');
                app.htmlPlayButton.classList.add('none');
                app.htmlRestartButton.classList.add('none');                
                app.game.play();
             
                setTimeout(()=>{
                    app.game.desktopPointer.enabled=true},700);
            });
        });
        app.htmlRestartButton.addEventListener('click', () => {
            app.mouse.enablePointerLock(() => {
                app.mainCamera.script.lookCamera.enabled=true;
                //app.htmlEnterVRButton.classList.add('none');
                app.htmlPlayButton.classList.add('none');
                app.htmlRestartButton.classList.add('none');                
                app.game.restart();
                setTimeout(()=>{app.game.desktopPointer.enabled=true},700);
            });
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
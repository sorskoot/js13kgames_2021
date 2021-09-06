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
    const texturemap = "data:image/webp;base64,UklGRkADAABXRUJQVlA4TDMDAAAv/8ADECfhKAAAMpptK8B6rOViLMUK2H8bxxpMAwBMMk9uaOUDe4E/+JRLSFZdC+tIkpU83D7dIQtyp8iCANzdXeY/AAAMQ/uvRhxPZTTwzLk2XRUgF16lrp4tH+nrNiIT4dluUz2nQT2fIvovSC/zftKywxibIn8bv4y0+AWUv3tncUx0jiQ39ymtzrwY027ZVogPHEzhCTqXQbZtW21buei64BilYLkhRy7//5FwOAcruu97R/Qfgtu2gSQ58W6z15nsdA9ov3CPQOjgEIg7gOvPC9j+bMGfKwC4t9WZak3NTEUAdAzLJnQRcH+v2Z8r3lMWwj1i+DnwvLidD5R0phyCqkSui3UTPY0BJc0qQxcvISsGJ79IN7omgEgAyJHtcL4teDuw0qIL6C7KQqHOfCGFcg0kzDCAjEwEwUVC14lvUv6iUYNcZUCu9AQYMjj+9qcgXkrOBwy4JoKhxKXThCrz7V4IvkBbiIz+ODNKB0F2FESuVyICjf9wAAz6ImAqhqxMvCuUViwyVNxHR4p5dbaXAc9MznYnBN8WBPcOWXG9aig70lZc9AZSN06Bu2VDJqXKHF/oOwXyA5kPFCbqQChsn2LHlCU7Ly/jKZDxJozNMnaVTK98N02Q3isA869Nf0xESKwBSQKrNVAauVs2u73GzIvLziRFvAnvkRIr/wPDtYCpLOiS9cc5g+uP0UIxrJoU2QqalQH8M6UOg6vGlJUVNr0ydMpBj1UCDm9Ys8RKtTwwQPs5Gwv7d2XklK1XzBgw0/+uBADGMvg8Qaf1aMfCeguaCbOv6ZVL9D/xeGCulpVptWWROTTyp76tRcviQvrvCjQTZl+TGBgWr3LaQaX1j+9VF9x6E81pl7ppOWWU5MxRiZaVZT0nWr4r+04NLiybP1BXToxw7pB3FZL7LmXLLudFI+mCKYVqTWXfTZICDMLEYBAUbWllFJ8lB947d9Tuu/9hR4B04gYuFlmSe9LrEciglN3XBMoQQwc5LrgVRkRjxaN57vqTc2f5yJy4QQbKbithPlZ2psy+poB28MQ9AsMPrgQJFOfOqIs0z922jYDZd+IuCGDuYIRz/eTO3QAA";
    const img = new Image(); // SWITCH THESE LINES TO USER WEBP
    //  img.src = texturemap;
    img.src = 'Tiles.webp';
    var texture = new pc.Texture(app.graphicsDevice, {
        width: this.width,
        height: this.height,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    texture.setSource(img);
    const tilesTexture = new pc.Asset("tiles", "texture");
    tilesTexture.resource = texture;
    tilesTexture.ready = true;
    app.assets.add(tilesTexture);
    
    console.log("Loading shader...");
    let shaderDefinition = {
        attributes: {
            aPosition: pc.gfx.SEMANTIC_POSITION,
            vertex_texCoord0: pc.gfx.SEMANTIC_TEXCOORD0
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
//--------------- POST EFFECT DEFINITION ------------------------//
pc.extend(pc, function () {
    var BlacknessEffect = function (graphicsDevice) {
        // Shaders
        var attributes = {
            aPosition: pc.SEMANTIC_POSITION
        };

        var passThroughVert =
            "attribute vec2 aPosition;varying vec2 vUv0;void main(void){gl_Position=vec4(aPosition,0.0,1.0);vUv0=(aPosition.xy+1.0)*0.5;}";

        var luminosityFrag = `precision ${graphicsDevice.precision} float;uniform sampler2D uColorBuffer;uniform float uDarkness;varying vec2 vUv0;void main(){vec4 texel=texture2D(uColorBuffer,vUv0);vec2 uv=(vUv0-vec2(0.5));gl_FragColor=vec4(texel.rgb-uDarkness,texel.a);}`;

        this.blacknessShader = new pc.Shader(graphicsDevice, {
            attributes: attributes,
            vshader: passThroughVert,
            fshader: luminosityFrag
        });

        this.offset = 1;
        this.darkness = 1;
    };

    BlacknessEffect = pc.inherits(BlacknessEffect, pc.PostEffect);

    BlacknessEffect.prototype = pc.extend(BlacknessEffect, {
        render: function (inputTarget, outputTarget, rect) {
            var device = this.device;
            var scope = device.scope;

            scope.resolve("uColorBuffer").setValue(inputTarget.colorBuffer);            
            scope.resolve("uDarkness").setValue(this.darkness);
            pc.drawFullscreenQuad(device, outputTarget, this.vertexBuffer, this.blacknessShader, rect);
        }
    });

    return {
        BlacknessEffect: BlacknessEffect
    };
}());


//--------------- SCRIPT DEFINITION------------------------//
var Blackness = pc.createScript('blackness');

// initialize code called once per entity
Blackness.prototype.initialize = function() {
    this.speed = .5;
    this.effect = new pc.BlacknessEffect(this.app.graphicsDevice);
    this.effect.darkness = 0;
    this.entity.camera.postEffects.addEffect(this.effect);
};
Blackness.prototype.update=function(dt){

    if(this.fadeOutActive){
        this.effect.darkness += dt/this.speed;
        if(this.effect.darkness>=1){
            this.effect.darkness = 1
            this.fadeOutActive=false;
            this.resove()
        }        
    }
    if(this.fadeInActive){
        this.effect.darkness -= dt/this.speed;
        if(this.effect.darkness<=0){
            this.effect.darkness = 0
            this.fadeInActive=false;
            this.resove()
        }        
    }
}
Blackness.prototype.fadeOut = function () {
    this.fadeOutActive = true;
    return new Promise(r => {
        this.resove = r;
    });
}
Blackness.prototype.fadeIn = function () {
    this.fadeInActive = true;
    return new Promise(r => {
        this.resove = r;
    });
}
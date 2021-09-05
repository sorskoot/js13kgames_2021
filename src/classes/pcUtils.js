/// <reference path="../../typings/playcanvas.d.ts" />
(function () {
    pc.util = {};
    
    var _transformedForward = new pc.Vec3();
    pc.util.getYaw = function (quat) {
        var transformedForward = _transformedForward;
        quat.transformVector(pc.Vec3.FORWARD, transformedForward);

        return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
    };

    pc.util.lerp = (a, b, n) => (1 - n) * a + n * b;


    pc.util.createTextTexture=function(text, backgroundColor, width=512, height=512){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.width = width;
        ctx.height = height;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0,0,width,height);
    
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
        const img = new Image();
        img.src = canvas.toDataURL();
        img.width = width;
        img.height = height;
    
        var texture = new pc.Texture(this.app.graphicsDevice, {
            width: width,
            height: height,
            format: pc.PIXELFORMAT_R8_G8_B8
        });
        texture.setSource(img);
    
        return texture;
    }

})();
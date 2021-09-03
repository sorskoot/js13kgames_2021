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

    /**
     * Runs to all the integer points between vec1 and vec2. Call callback for every point.
     * Make sure to return true if the check needs to continue. Return false to end the check.
     * @param {pc.Vec2} vec1 
     * @param {pc.Vec2} vex2 
     * @param {Function} callback 
     * @returns {pc.Vec2} the last point that was checked, or null if nothing found.
     */
    pc.util.checkLine=function(vec1, vex2, callback)
    {
        
        let x0 = Math.floor(vec1.x);
        let y0 = Math.floor(vec1.y);
        let x1 = Math.floor(vex2.x);
        let y1 = Math.floor(vex2.y);        
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let x = x0;
        let y = y0;
        let n = 1 + dx + dy;
        let x_inc = (x1 > x0) ? 1 : -1;
        let y_inc = (y1 > y0) ? 1 : -1;
        let error = dx - dy;
        dx *= 2;
        dy *= 2;
    
        for (; n > 0; --n)
        {
            const isEmpty = callback(x, y);
            if(!isEmpty){
                return new pc.Vec2(x, y);
            }
    
            if (error > 0)
            {
                x += x_inc;
                error -= dy;
            }
            else
            {
                y += y_inc;
                error += dx;
            }
        }

        return null;
    }

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
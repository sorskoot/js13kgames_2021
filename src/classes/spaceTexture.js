var SpaceTexture = pc.createScript('spacetexture');

// initialize code called once per entity
SpaceTexture.prototype.initialize = function () {
    var canvas = document.createElement("canvas");
    const width = canvas.width = 2048, height= canvas.height = 3000;
    var c2d = canvas.getContext("2d");
    c2d.fillStyle = "#FF00FF";
    c2d.fillRect(0, 0, canvas.width, canvas.height)
    var imageData = c2d.createImageData(canvas.width, canvas.height);
    var data = imageData.data;
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {         
            var v2 = noise2d(2 * x / canvas.width, 2 * y / canvas.height);            
            var i = (y * canvas.width + x) * 4;
            data[i + 0] = v2*  36;
            data[i + 1] = v2*  43;
            data[i + 2] = v2*  74;//0x4f;
            data[i + 3] = 0xff;// | ((1 + v) / 2 * 255);
        }
    }

    for (let s = 0; s < 10000; s++) {
        let x = ~~(Math.random() * canvas.width);
        let y = ~~(Math.random() * canvas.height);
        var i = (y * canvas.width + x) * 4;       
        var v = noise2d(2 * x / canvas.width, 2 * y / canvas.height); 
        data[i + 0] = 125+v*125;
        data[i + 1] = 125+v*125;
        data[i + 2] = 100+v*95;
        data[i + 3] = 0xff;
    }
    //66, 10, 77
    //41, 17, 69
    //-25*v+41, 7*v+10, -8*v+59
    c2d.putImageData(imageData, 0, 0);
    document.body.appendChild(canvas);
    const img = new Image();
    img.src = canvas.toDataURL();
    img.width = width;
    img.height = height;

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: width,
        height: height,
        format: pc.PIXELFORMAT_R8_G8_B8,
    });
    texture.setSource(img);   

    const m = new pc.StandardMaterial();
    m.diffuseMap = texture;
    m.update();
    const skybox = new pc.Entity();
    skybox.setLocalScale(50,50,50);
    skybox.addComponent('render',{
        type:'sphere'
    });
    skybox.render.material = m;
    
    skybox.render.meshInstances[0].flipFaces = true;    

    this.entity.addChild(skybox);    
};
var noiseMask = 0xff;
var noiseSize = noiseMask + 1;

var noiseValues = new Int16Array(noiseSize * 2);
for (var i = 0; i < noiseSize; i++) {
    var angle = Math.random() * Math.PI * 2;
    x = Math.sin(angle);
    y = Math.cos(angle);

    noiseValues[i] = x;
    noiseValues[i + 1] = y;

}
function noise2d(x, y) {
    function lerp(t, a, b) {
        return a + t * (b - a);
    };
    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };

    function grad2d(hash, x, y) {
        var u = (hash & 2) === 0 ? x : -x;
        var v = (hash & 1) === 0 ? y : -y;
        return u + v;
    };
    var intX = (0 | x) & noiseMask;
    var intY = (0 | y) & noiseMask;
    var fracX = x - (0 | x);
    var fracY = y - (0 | y);
    var r1 = noiseValues[intX] + intY;
    var r2 = noiseValues[intX + 1] + intY;
    var t1 = fade(fracX);
    var t2 = fade(fracY);

    var a1 = grad2d(noiseValues[r1], fracX, fracY);
    var b1 = grad2d(noiseValues[r2], fracX - 1, fracY);
    var a2 = grad2d(noiseValues[r1 + 1], fracX, fracY - 1);
    var b2 = grad2d(noiseValues[r2 + 1], fracX - 1, fracY - 1);
    return lerp(t2, lerp(t1, a1, b1), lerp(t1, a2, b2));
};

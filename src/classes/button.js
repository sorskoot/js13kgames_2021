/// <reference path="../../typings/playcanvas.d.ts" />
let Button = pc.createScript('button');

Button.attributes.add('text', {
    type: 'string'
});

Button.prototype.initialize = function () {
    var normaltexture  = this.createTexture('#242b4a');    
    var hovertexture  = this.createTexture('#4d6a94');    
    var alphaTexture = this.createAlphaTexture();
    const material = new pc.StandardMaterial();

    material.diffuseMap = normaltexture;
    
    material.opacityMap = alphaTexture;    
    material.opacityMapChannel = 'r';    
    material.alphaTest = .1;
    material.update();
    this.entity.render.material = material;
    //this.entity.addComponent('script');
    this.entity.name = this.text;
    this.entity.script.create('shape',{
        attributes:{
            keepUpdating:true
        }
    });
    this.entity.tags.add("button");

    this.entity.on('object:onhover', (e) => {
        material.diffuseMap = hovertexture;
        material.update();
    });
    this.entity.on('object:offhover', (e) => {
        material.diffuseMap = normaltexture;
        material.update();
    });
    this.entity.on('object:attemptuse', (e) => {
        this.entity.fire('button:click');
    });
};
Button.prototype.createAlphaTexture = function () {
    let canvas = document.createElement('canvas');
    const width = 180;
    canvas.width = width;
    const height = 80;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.width = width;
    ctx.height = height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#fff';    
    ctx.roundRect(10, 10, 160, 60, 25);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3    
    ctx.roundRect(10, 10, 160, 60, 25);
    ctx.stroke();

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

Button.prototype.createTexture = function (color) {
    let canvas = document.createElement('canvas');
    const width = 180;
    canvas.width = width;
    const height = 80;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.width = width;
    ctx.height = height;
    ctx.fillStyle = color;
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3    
    ctx.roundRect(10, 10, 160, 60, 25);
    ctx.stroke();
    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    
    ctx.fillText(this.text, canvas.width / 2, canvas.height / 2);

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

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }
  

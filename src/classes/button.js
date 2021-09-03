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
    this.entity.script.create('shape');
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
  
Button.prototype.test=function(text){
    let canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1024;

    let ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 8, 0, 120);
    gradient.addColorStop(.1,   '#fff901');
    gradient.addColorStop(.3, '#ff4400');
    gradient.addColorStop(.5,  '#c40001');
    gradient.addColorStop(.9, '#640000');
    gradient.addColorStop(1,   '#050000');
    
    ctx.shadowColor = '#131a9b';
    ctx.shadowBlur = 15;
    ctx.textAlign = 'center';
    ctx.fillStyle = gradient;
    ctx.font = '248px sans-serif';
    // while(ctx.measureText(text).width > canvas.width && this.data.fontsize>1){
    //     this.data.fontsize--;
    //     ctx.font = `${this.data.fontsize}px ${this.data.font}` ;
    // }
    ctx.fillText(text, 512, 512);
    let gradient2 = ctx.createLinearGradient(0, 5, 0, 140);
    gradient2.addColorStop(0.0, '#ff2929');
    // gradient2.addColorStop(0.1, '#131a9b');
    // gradient2.addColorStop(0.2, '#e3f3f2');
    // gradient2.addColorStop(0.3, '#1f1f75');
    // gradient2.addColorStop(0.4, '#01000a');
    // gradient2.addColorStop(0.5, '#1f1f75');
    // gradient2.addColorStop(0.6, '#aa1885');
    // gradient2.addColorStop(0.7, '#1f1f75');
    // gradient2.addColorStop(0.8, '#aa1885');
    gradient2.addColorStop(0.9, '#be0000');

    ctx.shadowColor = '#7b257c';
    ctx.shadowBlur = 1;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.strokeText(text, 512, 512);


    ctx.strokeStyle = gradient2;
    ctx.lineWidth = 4;
    ctx.strokeText(text, 512, 512);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.width = 512;
    img.height = 512;

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: 512,
        height: 512,
        
        format: pc.PIXELFORMAT_R8_G8_B8_A8
    });
    texture.setSource(img);

    return texture;
}


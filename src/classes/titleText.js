let TitleText = pc.createScript('titleText');

TitleText.prototype.initialize = function () {
    this.title = "STORAGE SPACE 13";
    this.width = 1200;
    this.height = 150;
    const material = new pc.StandardMaterial();
    material.diffuseMap = this.diffuseMap();
    material.opacityMap = this.opacityMap();
    material.opacityMapChannel = 'r';
    material.alphaTest = .1;
    material.update();
    this.entity.render.material = material;
}

TitleText.prototype.diffuseMap = function () {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.imageRendering = 'pixelated';
    
    var ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 8, 0, 118);
    gradient.addColorStop(0, '#524a63');
    gradient.addColorStop(0.25, '#5d8bb3');
    gradient.addColorStop(0.5, '#dfeded');
    gradient.addColorStop(0.51, '#242b4a');
    gradient.addColorStop(0.75, '#405578')
    gradient.addColorStop(0.95, '#4d6a94');
    gradient.addColorStop(1, '#5d8bb3');
    ctx.fillStyle = gradient;
    ctx.font = "italic bolder 110px monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.title, this.width / 2, this.height / 2);
    var gradient2 = ctx.createLinearGradient(0, 5, 0, 130);
    gradient2.addColorStop(0.0, '#fafac3');
    gradient2.addColorStop(0.1, '#ffd3a3');
    gradient2.addColorStop(0.2, '#ffac7f');
    gradient2.addColorStop(0.3, '#ff8766');
    gradient2.addColorStop(0.4, '#f54f4f');
    gradient2.addColorStop(0.5, '#fafac3');
    gradient2.addColorStop(0.6, '#ff8766');
    gradient2.addColorStop(0.7, '#ffac7f');
    gradient2.addColorStop(0.8, '#ffd3a3');
    gradient2.addColorStop(0.9, '#ffd3a3');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeText(this.title, this.width / 2, this.height / 2);

    ctx.shadowColor = '#242b4a';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.strokeStyle = gradient2;
    ctx.lineWidth = 2;
    ctx.strokeText(this.title, this.width / 2, this.height / 2);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.width = this.width;
    img.height = this.height;

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: this.width,
        height: this.height,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    texture.setSource(img);

    return texture;
}

TitleText.prototype.opacityMap = function () {
    var canvas = document.createElement("canvas");

    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = '#fff';
    ctx.font = "italic bolder 110px monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.title, this.width / 2, this.height / 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.strokeText(this.title, this.width / 2, this.height / 2);

    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.strokeText(this.title, this.width / 2, this.height / 2);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.width = this.width;
    img.height = this.height;

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: this.width,
        height: this.height,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    texture.setSource(img);

    return texture;
}
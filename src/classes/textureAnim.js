var TextureAnim = pc.createScript('textureanim');

TextureAnim.attributes.add('index', {
    type: 'number'
});


TextureAnim.prototype.initialize = function () {
    this.t = this.q = 0;
    this.entity.render.material.setParameter('lookupIndex', this.index);
    this.entity.render.material.update();
}

TextureAnim.prototype.update = function (dt) {
    this.t += dt;
    if (this.t > .2) {
        this.q = (this.q + 1) % 5;
        this.entity.render.material.setParameter('lookupShift', this.q);
        this.t = 0;
    }
};


var Shape = pc.createScript('shape');

Shape.attributes.add('keepUpdating', {
    type: 'boolean',
    default: false
});

// initialize code called once per entity
Shape.prototype.initialize = function () {
    this._halfExtents = this.entity.getLocalScale().clone().scale(0.5);
    this._shape = new pc.BoundingBox(this.entity.getPosition().clone(), this._halfExtents);
};

Shape.prototype.postInitialize = function () {
    this.app.fire("shapeworld:add", this.entity, this._shape);
    this.on('state', this._onStateChanged, this);
};

Shape.prototype._onStateChanged = function (enabled) {
    var addToObject = this.app;
    if (enabled) {
        addToObject.fire("shapeworld:add", this.entity, this._shape);
    } else {
        addToObject.fire("shapeworld:remove", this.entity, this._shape);
    }
};

Shape.prototype.update = function (dt) {
    if (this.keepUpdating) {
        this._shape.center.copy(this.entity.getPosition());
    }
};
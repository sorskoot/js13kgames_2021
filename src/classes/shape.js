var Shape = pc.createScript('shape');

// Shape.attributes.add('childOfActualEntity', {
//     type: 'boolean', 
//     default: false, 
//     title: 'Child Of Actual Entity', 
//     description: 'Tick if the shape is a child of the actual entity object'
// });

// Shape.attributes.add('keepUpdating', {
//     type: 'boolean', 
//     default: false, 
//     title: 'Keep Updating', 
//     description: 'Update the shape data every frame (only toggle if the entity moves as can be expensive)'
// });

// Shape.attributes.add('addToObject', { type: 'string', enum: [{'Global': 'app'}, {'Actual Entity': 'actualEntity'}], title: 'Add to Object', default: 'app'});


// initialize code called once per entity
Shape.prototype.initialize = function() {
    this._halfExtents = this.entity.getLocalScale().clone().scale(0.5);
    this._shape = new pc.BoundingBox(this.entity.getPosition().clone(), this._halfExtents);
    
//     // Hide the model as it's just there to aid placement in the editor
//     if (this.entity.model) {
//         var instances = this.entity.model.meshInstances;
//         if (instances) {
//             for (var i = 0; i < instances.length; ++i) {
//                 instances[i].visible = false;
//             }
//         }
//     }
};


Shape.prototype.postInitialize = function() {
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
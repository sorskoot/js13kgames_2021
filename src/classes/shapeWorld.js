var ShapeWorld = pc.createScript('shapeWorld');

// initialize code called once per entity
ShapeWorld.prototype.initialize = function() {
    // Keep an array of all the entities we can pick at
    this._pickableEntities = [];
    this._pickableShapes = [];
    
    // Register events for when pickable entities are created
    this.app.on("shapeworld:add", this.addItem, this);
    this.app.on("shapeworld:remove", this.removeItem, this);
    
    
    // Create a global 
    this.app.shapeWorld = this;
};

ShapeWorld.hitPoint = new pc.Vec3();
ShapeWorld.vecBetween = new pc.Vec3();

ShapeWorld.prototype.raycast = function (ray, intersectPosition, length) {               
    var hitPoint = ShapeWorld.hitPoint;
    var vecBetween = ShapeWorld.vecBetween;
    
    var closestDistance = length || Infinity;
    var hitEntity = null;
    
    // Test the ray against all the objects registered to this picker
    for (var i = 0; i < this._pickableShapes.length; ++i) {
        var pickableShape = this._pickableShapes[i];
        var entity = this._pickableEntities[i];
        
        if (entity.enabled) {
            if (pickableShape.intersectsRay(ray, hitPoint)) {
                var distance = ray.origin.distance(hitPoint);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    hitEntity = entity;
                    
                    if (intersectPosition) {
                        intersectPosition.copy(hitPoint);
                    }
                }
            }
        }
    }  

    return hitEntity;
};

ShapeWorld.prototype.addItem = function (entity, shape) {
    if (entity) {
        this._pickableEntities.push(entity);
        this._pickableShapes.push(shape);
    }
};

        
ShapeWorld.prototype.removeItem = function (entity) {
    var i = this._pickableEntities.indexOf(entity);
    if (i >= 0) {
        this._pickableEntities.splice(i, 1);
        this._pickableShapes.splice(i, 1);
    }
};
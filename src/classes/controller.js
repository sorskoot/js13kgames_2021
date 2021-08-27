var Controller = pc.createScript('controller');

Controller.attributes.add('modelEntity', {
    type: 'entity'
});

Controller.prototype.initialize = function () {
    this.ray = new pc.Ray();
    this.vecA = new pc.Vec3();
    this.vecB = new pc.Vec3();
    this.hoverPoint = new pc.Vec3();
    this.mouseCoords = new pc.Vec2();
    this.teleportableEntity = null;
    this.hoverEntity = null;
    this.color = new pc.Color(1, 1, 1);
    this.teleportable = true;
    this.active = true;
};

Controller.prototype.onSelectStart = function () {
    this.pick();
    if (this.teleportableEntity) {
        // teleport
        if (this.app.xr.active) {
            this.app.fire('teleport:to', this.hoverPoint);
        }
    } else if (this.hoverEntity && !this.holdingEntity) {
        this.hoverEntity.fire('object:interact', this);
        this.hoverEntity.fire('object:hold', this);
    }
};

Controller.prototype.onSelectEnd = function () {
    if (this.teleportableEntity) {
        if (!this.app.xr.active && this.teleportable) {
            this.app.fire('teleport:to', this.hoverPoint);
        }
    }

    if (this.hoverEntity) {
        this.hoverEntity.fire('object:attemptuse', this);
    }
};

Controller.prototype.pick = function () {
    if (this.inputSource) {
        this.ray.set(this.inputSource.getOrigin(), this.inputSource.getDirection());
    } else if (!pc.Mouse.isPointerLocked()) {
        this.app.mainCamera.camera.screenToWorld(this.mouseCoords.x, this.mouseCoords.y, this.app.mainCamera.camera.nearClip, this.vecA);
        this.app.mainCamera.camera.screenToWorld(this.mouseCoords.x, this.mouseCoords.y, this.app.mainCamera.camera.farClip, this.vecB);
        this.vecB.sub(this.vecA).normalize();
        this.ray.set(this.vecA, this.vecB);
        this.holdingNoOffset = true;
    } else {
        this.ray.set(this.app.mainCamera.getPosition(), this.app.mainCamera.forward);
    }

    var hoverEntity = this.app.shapeWorld.raycast(this.ray, this.hoverPoint);
    var validTeleport = false;

    if (!this.active) hoverEntity = null;

    if (this.hoverEntity !== hoverEntity) {
        if (this.hoverEntity)
            this.hoverEntity.fire('object:offhover', this);

        if (hoverEntity)
            hoverEntity.fire('object:onhover', this);

        this.hoverEntity = hoverEntity;
    }

    if (this.hoverEntity) {
        // check teleportable
        if (this.hoverEntity.tags.has('floor')) {
            var dot = this.hoverEntity.up.dot(this.ray.direction);
            if (dot <= 0) validTeleport = true;
        }

    }

    if (validTeleport) {
        this.teleportableEntity = this.hoverEntity;
    } else {
        this.teleportableEntity = null;
    }
};

Controller.prototype.update = function (dt) {
    if (this.inputSource && this.inputSource.targetRayMode !== 'gaze') {
        // render ray line
        this.vecA.copy(this.inputSource.getOrigin());
        this.vecB.copy(this.inputSource.getDirection());
        this.vecB.scale(1000).add(this.vecA);
        if (this.inputSource.selecting) {
            this.color.set(0, 1, 0);
        } else {
            this.color.set(1, 1, 1);
        }
        this.app.renderLine(this.vecA, this.vecB, this.color);
    }

    // it is a hand
    if (this.inputSource && this.inputSource.grip) {
        // is can be gripped, enable model and transform it accordingly
        this.modelEntity.enabled = true;
        this.entity.setPosition(this.inputSource.getPosition());
        this.entity.setRotation(this.inputSource.getRotation());
    } else {
        this.modelEntity.enabled = false;

        if (!this.inputSource || this.inputSource.targetRayMode === 'gaze') {
            this.entity.setPosition(this.app.mainCamera.getPosition());
            this.entity.setRotation(this.app.mainCamera.getRotation());
        }
    }

    this.pick();

    if (this.teleportableEntity) {
        this.vecB.copy(this.hoverEntity.up).scale(0.01);
        this.vecA.copy(this.hoverPoint).add(this.vecB);
        this.app.fire('teleport:transform', this.vecA, this.hoverEntity.getRotation());
        this.app.fire('teleport:show');
    } else {
        this.app.fire('teleport:hide');
    }
};


Controller.prototype.setInputSource = function(inputSource, asset) {
    var self = this;
    
    this.inputSource = inputSource;
    this.inputSource.once('remove', this.onRemove, this);
    
    this.on('hover', this.onHover, this);
    this.on('blur', this.onBlur, this);
    
    this.inputSource.on('selectstart', this.onSelectStart, this);
    this.inputSource.on('selectend', this.onSelectEnd, this);
    
 
};

Controller.prototype.onRemove = function() {
    // if (this.modelEntity.containerAsset) {
    //     console.log(this.modelEntity.containerAsset);
    //     this.modelEntity.containerAsset.unload();
    //     this.app.assets.remove(this.modelEntity.containerAsset);
    //     this.modelEntity.containerAsset = null;
    // }
    
    this.entity.destroy();
};
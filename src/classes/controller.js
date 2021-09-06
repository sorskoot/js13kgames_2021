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
    this.allowedTeleportTargets = [0, 'S', 'T'];
    this.lastRotateValue = 0;
    this.button4Pressed = false;
    this.app.on('level:next', this.onLevelNext, this);
};

Controller.prototype.onLevelNext = function () {
    this.lastRotateValue = 0;
    this.hoverEntity = null;
    this.teleportableEntity = null;
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
        if (this.hoverEntity) {
            this.hoverEntity.fire('object:offhover', this);

        }
        if (hoverEntity) {
            hoverEntity.fire('object:onhover', this);
        }

        this.hoverEntity = hoverEntity;
    }

    if (this.hoverEntity) {
        // check teleportable
        if (this.hoverEntity.tags.has('floor')) {
            var dot = this.hoverEntity.up.dot(this.ray.direction);

            if (~this.allowedTeleportTargets.indexOf(this.app.levelController.getTileAt(this.hoverEntity.getPosition()))) {                
                const canTeleport = this.app.levelController.canTeleportTo(this.hoverEntity.getPosition());
                // Check if anything is between the player and the target point                
                if (dot <= 0 && canTeleport) {
                    validTeleport = true;
                }

            }
        }
    }

    if (validTeleport) {
        this.teleportableEntity = this.hoverEntity;
    } else {
        this.teleportableEntity = null;
    }
};


Controller.prototype.update = function (dt) {
    // Get button A from xr controller 
   
    if (this.inputSource && this.inputSource.gamepad.buttons[4]?.pressed && !this.button4Pressed) {
        this.button4Pressed = true;
        this.app.fire('button4:pressed');
    } 
    if (this.inputSource && !this.inputSource.gamepad.buttons[4]?.pressed && this.button4Pressed) {
        this.button4Pressed = false;
    }    
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

    if (this.inputSource?.handedness === pc.XRHAND_RIGHT) {
        const rotate = -this.inputSource.gamepad.axes[2];

        // each rotate should be done by moving thumbstick to the side enough
        // then thumbstick should be moved back close to neutral position
        // before it can be used again to rotate
        if (this.lastRotateValue > 0 && rotate < rotateResetThreshold) {
            this.lastRotateValue = 0;
        } else if (this.lastRotateValue < 0 && rotate > -rotateResetThreshold) {
            this.lastRotateValue = 0;
        }

        // if thumbstick is reset and moved enough to the side
        if (this.lastRotateValue === 0 && Math.abs(rotate) > rotateThreshold) {
            this.lastRotateValue = Math.sign(rotate);

            // we want to rotate relative to camera position
            this.app.fire('rotate:to', rotate);

        }
    }
};


Controller.prototype.setInputSource = function (inputSource, asset) {
    var self = this;

    this.inputSource = inputSource;
    this.inputSource.once('remove', this.onRemove, this);

    this.on('hover', this.onHover, this);
    this.on('blur', this.onBlur, this);

    this.inputSource.on('selectstart', this.onSelectStart, this);
    this.inputSource.on('selectend', this.onSelectEnd, this);


};

Controller.prototype.onRemove = function () {
    // if (this.modelEntity.containerAsset) {
    //     console.log(this.modelEntity.containerAsset);
    //     this.modelEntity.containerAsset.unload();
    //     this.app.assets.remove(this.modelEntity.containerAsset);
    //     this.modelEntity.containerAsset = null;
    // }

    this.entity.destroy();
};
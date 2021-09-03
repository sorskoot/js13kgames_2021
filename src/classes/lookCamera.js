var LookCamera = pc.createScript('lookCamera');

LookCamera.attributes.add('mouseSensivity', {
    title: 'Mouse Sensivity',
    type: 'number',
    default: 0.3
});

LookCamera.attributes.add('controllerTemplate', {
    title: 'Controller Template',
    type: 'entity',
});

LookCamera.prototype.initialize = function () {
    this._offsetParent = this.entity.parent;
    
    // Camera euler angle rotation around x and y axes
    var rotation = this.entity.getRotation();
    this.yaw = pc.util.getYaw(rotation);
    this.pitch = this._getPitch(rotation, this.yaw);
    
    this.movedMouse = 0;
    this.movedStart = 0;
    this.touchCoords = new pc.Vec2();

    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this._onMouseDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this._onMouseUp, this);
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);
    
    this.app.mouse.disableContextMenu();
    
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this._onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this._onTouchEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this._onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this._onTouchMove, this);
    }
    
    this.app.mainCamera = this.entity;
    
    this.gazeController = null;
    if (! this.app.xr.active) {
        this.gazeController = this.controllerTemplate.clone();
        this.gazeController.reparent(this.app.root);
        this.gazeController.enabled = true;
    }
    
    this.app.xr.on('start', function() {
        if (! this.gazeController) return;
        this.gazeController.destroy();
        this.gazeController = null;
    }, this);
    
    this.app.xr.on('end', function() {
        if (! this.gazeController) {
            this.gazeController = this.controllerTemplate.clone();
            this.gazeController.reparent(this.app.root);
            this.gazeController.enabled = true;
        }
    }, this);
};

LookCamera.prototype._onMouseDown = function (event) {
    
    if (this.app.xr.active)
        return;
    
    //Attempt to lock the pointer
    if (! pc.Mouse.isPointerLocked()) {
        if (event.event.target.id && event.event.target.id == 'application') {
            this.app.mouse.enablePointerLock();
        }
    }
    
    if (event.button !== pc.MOUSEBUTTON_LEFT)
        return;
    
    this.movedStart = Date.now();
    this.movedMouse = 0;
    
    if (this.gazeController)
        this.gazeController.script.controller.onSelectStart();
    
};

LookCamera.prototype._onTouchStart = function (event) {
    if (this.app.xr.active) return;
    
    event.event.preventDefault();
    
    if (event.touches.length !== 1) return;
    
    this.movedStart = Date.now();
    this.movedMouse = 0;
    
    this.touchCoords.set(event.touches[0].x, event.touches[0].y);
    
    if (this.gazeController) {
        this.gazeController.script.controller.active = true;
        this.gazeController.script.controller.mouseCoords.set(event.touches[0].x, event.touches[0].y);
        this.gazeController.script.controller.onSelectStart();
    }
};

LookCamera.prototype._onMouseUp = function (event) {
    if (this.app.xr.active)
        return;
    
    if (event.button !== pc.MOUSEBUTTON_LEFT)
        return;
    
    if (this.gazeController) {
        if (! pc.Mouse.isPointerLocked() && (this.movedMouse > 30 || (Date.now() - this.movedStart) > 300))
            this.gazeController.script.controller.teleportable = false;
        
        this.gazeController.script.controller.onSelectEnd();
        this.gazeController.script.controller.teleportable = true;
    }
};

LookCamera.prototype._onTouchEndCancel = function (event) {
    if (this.app.xr.active) return;
    if (event.touches.length !== 0) return;
    
    if (this.gazeController) {
        if (this.movedMouse > 30 || (Date.now() - this.movedStart) > 300)
            this.gazeController.script.controller.teleportable = false;
        
        this.gazeController.script.controller.onSelectEnd();
        this.gazeController.script.controller.teleportable = true;
        this.gazeController.script.controller.active = false;
    }
};

LookCamera.prototype._onMouseMove = function (event) {
    if (this.app.xr.active)
        return;
    
    if (this.gazeController) {
        this.gazeController.script.controller.mouseCoords.set(event.x, event.y);
        this.gazeController.script.controller.active = true;
    }
    
    if (pc.Mouse.isPointerLocked() || (this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT) && ! this.gazeController )) {
        this.pitch = Math.max(-90, Math.min(90, this.pitch - (event.dy * this.mouseSensivity)));
        this.yaw -= event.dx * this.mouseSensivity;
        
        this.movedMouse += Math.abs(event.dy) + Math.abs(event.dx);
    }
};

LookCamera.prototype._onTouchMove = function (event) {
    if (this.app.xr.active) return;
    if (event.touches.length !== 1) return;
    
    if (this.gazeController)
        this.gazeController.script.controller.mouseCoords.set(event.touches[0].x, event.touches[0].y);
    
    if (! this.gazeController || ! this.gazeController.script.controller.getHeldEntity()) {
        var dx = event.touches[0].x - this.touchCoords.x;
        var dy = event.touches[0].y - this.touchCoords.y;
        this.touchCoords.set(event.touches[0].x, event.touches[0].y);
        
        this.pitch = Math.max(-90, Math.min(90, this.pitch - (dy * this.mouseSensivity)));
        this.yaw -= dx * this.mouseSensivity;
        
        this.movedMouse += Math.abs(dy) + Math.abs(dx);
    }
};

LookCamera.prototype.update = function (dt) {
    this._offsetParent.setLocalEulerAngles(0, this.yaw, 0);
    
    if (! this.app.xr.active) {
        this.entity.setLocalEulerAngles(this.pitch, 0, 0);
    }
};

LookCamera.quatWithoutYaw = new pc.Quat();
LookCamera.yawOffset = new pc.Quat();

LookCamera.prototype._getPitch = function(quat, yaw) {
    var quatWithoutYaw = LookCamera.quatWithoutYaw;
    var yawOffset = LookCamera.yawOffset;
    
    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);
    
    var transformedForward = new pc.Vec3();
    
    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);
    
    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};
var LookCamera = pc.createScript('lookCamera');

LookCamera.attributes.add('controllerTemplate', {
    title: 'Controller Template',
    type: 'entity',
});

LookCamera.prototype.initialize = function () {
    this.mouseSensivity = 0.3;
    this._offsetParent = this.entity.parent;
    
    // Camera euler angle rotation around x and y axes
    var rotation = this.entity.getRotation();
    this.yaw = pc.util.getYaw(rotation);
    this.pitch = this._getPitch(rotation, this.yaw);
    
    this.movedMouse = 0;
    this.movedStart = 0;
   // this.touchCoords = new pc.Vec2();

    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this._onMouseDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this._onMouseUp, this);
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);
    
    this.app.mouse.disableContextMenu();
    
    // if (this.app.touch) {
    //     this.app.touch.on(pc.EVENT_TOUCHSTART, this._onTouchStart, this);
    //     this.app.touch.on(pc.EVENT_TOUCHEND, this._onTouchEndCancel, this);
    //     this.app.touch.on(pc.EVENT_TOUCHCANCEL, this._onTouchStartEndCancel, this);
    //     this.app.touch.on(pc.EVENT_TOUCHMOVE, this._onTouchMove, this);
    // }
    
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

/**
 * Handels mouse down events.
 * @param {Event} event 
 */
LookCamera.prototype._onMouseDown = function (event) {
    
    if (this.app.xr.active)
        return;
    
    if (event.button !== pc.MOUSEBUTTON_LEFT)
        return;
    
    this.movedStart = Date.now();
    this.movedMouse = 0;
    
    if (this.gazeController && pc.Mouse.isPointerLocked())
        this.gazeController.script.controller.onSelectStart();
    
};

LookCamera.prototype._onMouseUp = function (event) {
    if (this.app.xr.active)
        return;
    
    if (event.button !== pc.MOUSEBUTTON_LEFT)
        return;
    
    if (this.gazeController) {
        if (!pc.Mouse.isPointerLocked() && (this.movedMouse > 30 || (Date.now() - this.movedStart) > 300))
            this.gazeController.script.controller.teleportable = false;
        
        this.gazeController.script.controller.onSelectEnd();
        this.gazeController.script.controller.teleportable = true;
    }
};

LookCamera.prototype._onMouseMove = function (event) {
    if (this.app.xr.active)
        return;
    
    if (this.gazeController) {
        this.gazeController.script.controller.mouseCoords.set(event.x, event.y);
        this.gazeController.script.controller.active = true;
    }
    if(Math.abs(event.dy) > 25) return;
    if(Math.abs(event.dx) > 25) return;
    if (pc.Mouse.isPointerLocked() || (this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT) && ! this.gazeController )) {
        this.pitch = Math.max(-90, Math.min(90, this.pitch - (event.dy * this.mouseSensivity)));
        this.yaw -= event.dx * this.mouseSensivity;
        
        this.movedMouse += Math.abs(event.dy) + Math.abs(event.dx);
    }
};

LookCamera.prototype.update = function (dt) {
    
    if (! this.app.xr.active) {
        this._offsetParent.setLocalEulerAngles(0, this.yaw, 0);
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
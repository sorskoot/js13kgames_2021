/// <reference path="../../typings/playcanvas.d.ts" />
let TeleportCamera = pc.createScript('teleportCamera');

TeleportCamera.prototype.initialize = function () {
    this.tempVec = new pc.Vec3();

    this.app.on('teleport:to', function (position, yrotation = null) {
        let targetPos = new pc.Vec3(Math.floor(position.x) + .5, 0, Math.floor(position.z) + .5);
        this.entity.setPosition(targetPos);

        if (yrotation != null) {
            this.tempVec.copy(this.app.mainCamera.getLocalPosition());
            this.entity.translateLocal(this.tempVec);
            this.entity.setLocalEulerAngles(0, yrotation, 0);
            // @ts-ignore engine-tsd
            this.entity.translateLocal(this.tempVec.scale(-1));
        }
    }, this);
};


let RotateCamera = pc.createScript('rotateCamera');

RotateCamera.prototype.initialize = function () {
    this.tempVec = new pc.Vec3();
    this.app.on('rotate:to', function (rotate) {
        this.tempVec.copy(this.app.mainCamera.getLocalPosition());
        this.entity.translateLocal(this.tempVec);
        this.entity.rotateLocal(0, Math.sign(rotate) * rotateSpeed, 0);
        // @ts-ignore engine-tsd
        this.entity.translateLocal(this.tempVec.scale(-1));
    }, this);
};


let TeleportCamera = pc.createScript('teleportCamera');

TeleportCamera.prototype.initialize = function() {
    this.app.on('teleport:to', function(position) {
        let targetPos = new pc.Vec3(Math.floor(position.x)+.5, 0, Math.floor(position.z)+.5);
        this.entity.setPosition(targetPos);

    }, this);
};


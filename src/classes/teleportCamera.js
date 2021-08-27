let TeleportCamera = pc.createScript('teleportCamera');

TeleportCamera.prototype.initialize = function() {
    this.app.on('teleport:to', function(position) {
        this.entity.setPosition(position);
    }, this);
};


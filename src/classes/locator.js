var Teleport = pc.createScript('teleport');

Teleport.prototype.initialize = function() {
    this.app.on('teleport:show', function() {
        this.entity.enabled = true;
    }, this);
    
    this.app.on('teleport:hide', function() {
        this.entity.enabled = false;
    }, this);
    
    this.app.on('teleport:transform', function(position, rotation) {
        this.entity.setPosition(position);
        this.entity.setRotation(rotation);
    }, this);
};
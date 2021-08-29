
var BoxController = pc.createScript('boxController');

// initialize code called once per entity
BoxController.prototype.initialize = function () {
    this.direction = new pc.Vec3(0, 0, 0);

    this.entity.on('object:onhover', (e) => {
        this.entity.model.material.setParameter("tint", [1, 1, .5, 1]);
        //  this.entity.model.material.setParameter("index",0);
        this.entity.model.material.update();
    });
    this.entity.on('object:offhover', (e) => {
        this.entity.model.material.setParameter("tint", [0, 0, 0, 0]);;
        // this.entity.model.material.setParameter("index",2);
        this.entity.model.material.update();
    });
    this.entity.on('object:interact', (e) => {
        if (this.isMoving) return;

        this.entity.model.material.setParameter("tint", [0, 1, 0, 1]);
        this.entity.model.material.update();
        /**
         * @type {pc.Vec3} 
         */
        let cameraPosition = this.app.mainCamera.getPosition();
        let boxPosition = this.entity.getPosition();
        let dir = cameraPosition.sub(boxPosition);
        dir.normalize();
        let dotForward = dir.dot(pc.Vec3.FORWARD);
        let dotRight = dir.dot(pc.Vec3.RIGHT);
        if (Math.abs(dotForward) > Math.abs(dotRight)) {
            if (dotForward > 0) {
                this.direction.set(0, 0, 1);
            } else {
                this.direction.set(0, 0, -1);
            }
        } else {
            if (dotRight > 0) {
                this.direction.set(-1, 0, 0);
            } else {
                this.direction.set(1, 0, 0);
            }
        }
        this._calculateNextTarget();
    });
}
let vecA = new pc.Vec3();

BoxController.prototype.update = function (dt) {
    if (this.isMoving) {
        this.movementTime += dt*8;
        vecA.set(pc.util.lerp(this.lastPosition.x, this.targetPosition.x, this.movementTime),
            this.lastPosition.y,
            pc.util.lerp(this.lastPosition.z, this.targetPosition.z, this.movementTime))
        this.entity.setPosition(vecA);
        if (this.movementTime >= 1) {
            this.entity.setPosition(this.targetPosition);
            this.isMoving = false;
            // did we reach the target?
            if(this.app.levelController.getTileAt(this.targetPosition) === 'T') {
                console.log('we reached the target');
            }else{
            // need to move again?            
                this._calculateNextTarget();            
            }
        }
    }
}
BoxController.prototype._calculateNextTarget = function() {
    this.targetPosition = new pc.Vec3(0, 0, 0);
    this.lastPosition = this.entity.getPosition().clone();
    if (this.app.levelController.tryMoveBox(this.lastPosition, this.direction, this.targetPosition)) {
        this.isMoving = true;
        this.movementTime = 0;
    }
}


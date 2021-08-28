var BoxController = pc.createScript('boxController');

// initialize code called once per entity
BoxController.prototype.initialize = function() {   
    this.direction = new pc.Vec3(0,0,0);

    this.entity.on('object:onhover', (e)=>{
        this.entity.model.material.setParameter("tint",[1,1,.5,1]);
     //  this.entity.model.material.setParameter("index",0);
        this.entity.model.material.update();
    });
    this.entity.on('object:offhover', (e)=>{
        this.entity.model.material.setParameter("tint",[0,0,0,0]);;
      // this.entity.model.material.setParameter("index",2);
        this.entity.model.material.update();
    });
    this.entity.on('object:interact', (e)=>{
        this.entity.model.material.setParameter("tint",[0,1,0,1]);
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
        if(Math.abs(dotForward) > Math.abs(dotRight)){
           
            if(dotForward > 0){
                this.direction.set(0,0,1);                
            }else{
                this.direction.set(0,0,-1);
            }
        }else{            
            if(dotRight > 0){
                this.direction.set(-1,0,0);
            }else{
                this.direction.set(1,0,0);
            }
        }                       
    });
}
let t = 0;
BoxController.prototype.update = function(dt) {
    if(t>10)return;
    t+=dt;
    let p = this.entity.getPosition();
    
    this.entity.setPosition(p.add(this.direction.clone().mulScalar(dt)));
}

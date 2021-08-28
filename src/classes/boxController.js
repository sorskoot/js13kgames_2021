var BoxController = pc.createScript('boxController');

// initialize code called once per entity
BoxController.prototype.initialize = function() {
   
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
}

var Controllers = pc.createScript('controllers');

Controllers.attributes.add('controllerTemplate', {
    type: 'entity'   
});

Controllers.prototype.initialize = function() {
   // this.controllerAssets = this.app.assets.findByTag('controller');
    this.controllerAssetsIndex = { };
    
    // for(var i = 0; i < this.controllerAssets.length; i++) {
    //     var name = this.controllerAssets[i].name.replace(/\.[a-z]+$/i, '');
    //     this.controllerAssetsIndex[name] = this.controllerAssets[i];
    // }
    
    // when controller is added
    this.app.xr.input.on('add', function (inputSource) {
        // clone controller entity template                
        var entity = this.controllerTemplate.clone();
                
        // find related model asset
        var asset = null;
        // for(var i = 0; i < inputSource.profiles.length; i++) {
        //     var name = inputSource.profiles[i] + '-' + inputSource.handedness;
        //     asset = this.controllerAssetsIndex[name];
        //     if (asset) break;
        // }
        
        // // default to generic-trigger
        // if (! asset) asset = this.controllerAssetsIndex['generic-trigger-' + (inputSource.handedness || 'none')];
        entity.reparent(this.app.root);
     entity.script.controller.setInputSource(inputSource, asset);
        entity.enabled = true;
    }, this);
};
